from fastapi import APIRouter, HTTPException
from pydantic import BaseModel, Field
from typing import List, Optional, Dict, Any
import math

router = APIRouter(prefix="/api/py/tournaments", tags=["Tournaments Engine"])

class TeamInput(BaseModel):
    id: str
    name: str
    seed: Optional[int] = None
    captain_name: Optional[str] = None

class BracketGenerationRequest(BaseModel):
    tournament_name: str
    format: str = Field(default="SINGLE_ELIMINATION", description="SINGLE_ELIMINATION or ROUND_ROBIN")
    teams: List[TeamInput]
    courts_available: int = Field(default=2, ge=1)
    match_duration_minutes: int = Field(default=90, ge=15)

class MatchSlot(BaseModel):
    match_id: str
    round_name: str
    match_number: int
    team_a: Optional[str]
    team_b: Optional[str]
    is_bye: bool
    estimated_court: int
    slot_index: int

class BracketGenerationResponse(BaseModel):
    tournament_name: str
    total_teams: int
    bracket_size: int
    total_rounds: int
    matches: List[MatchSlot]
    notes: List[str]

class NRRCalculationRequest(BaseModel):
    runs_scored: int
    overs_faced: float
    runs_conceded: int
    overs_bowled: float

class NRRCalculationResponse(BaseModel):
    run_rate_for: float
    run_rate_against: float
    net_run_rate: float
    status: str

@router.post("/generate-bracket", response_model=BracketGenerationResponse)
def generate_bracket(req: BracketGenerationRequest):
    """
    Deterministic tournament bracket generation with automatic power-of-two padding,
    bye allocation, and pitch/court time slot sequencing.
    """
    team_count = len(req.teams)
    if team_count < 2:
        raise HTTPException(status_code=400, detail="A minimum of 2 teams is required to generate a bracket.")

    # Calculate bracket size (next power of 2)
    bracket_size = 2 ** math.ceil(math.log2(team_count))
    total_rounds = int(math.log2(bracket_size))
    byes_needed = bracket_size - team_count

    matches: List[MatchSlot] = []
    notes: List[str] = []

    # Sort teams by seed if provided
    sorted_teams = sorted(req.teams, key=lambda t: (t.seed if t.seed is not None else 999))
    team_names = [t.name for t in sorted_teams]

    # Fill seeds and byes
    padded_slots: List[Optional[str]] = []
    for i in range(bracket_size):
        if i < team_count:
            padded_slots.append(team_names[i])
        else:
            padded_slots.append(None) # Bye

    notes.append(f"Bracket size: {bracket_size} slots configured with {byes_needed} byes.")

    # Generate Round 1 pairings
    round_match_count = bracket_size // 2
    court_idx = 1
    slot_idx = 1

    for i in range(round_match_count):
        t_a = padded_slots[i]
        t_b = padded_slots[bracket_size - 1 - i]
        is_bye = (t_a is None or t_b is None)

        matches.append(MatchSlot(
            match_id=f"R1-M{i+1}",
            round_name="Round 1",
            match_number=i + 1,
            team_a=t_a,
            team_b=t_b,
            is_bye=is_bye,
            estimated_court=court_idx,
            slot_index=slot_idx
        ))

        if not is_bye:
            court_idx = (court_idx % req.courts_available) + 1
            if court_idx == 1:
                slot_idx += 1

    # Generate Subsequent elimination rounds
    for r in range(2, total_rounds + 1):
        round_matches = bracket_size // (2 ** r)
        r_name = "Grand Final" if round_matches == 1 else "Semifinal" if round_matches == 2 else f"Quarterfinal (Round {r})"
        for m in range(round_matches):
            matches.append(MatchSlot(
                match_id=f"R{r}-M{m+1}",
                round_name=r_name,
                match_number=m + 1,
                team_a=f"Winner of R{r-1}-M{2*m+1}",
                team_b=f"Winner of R{r-1}-M{2*m+2}",
                is_bye=False,
                estimated_court=1,
                slot_index=slot_idx + r
            ))

    return BracketGenerationResponse(
        tournament_name=req.tournament_name,
        total_teams=team_count,
        bracket_size=bracket_size,
        total_rounds=total_rounds,
        matches=matches,
        notes=notes
    )

@router.post("/calculate-nrr", response_model=NRRCalculationResponse)
def calculate_nrr(req: NRRCalculationRequest):
    """
    Standard International Cricket Council (ICC) Net Run Rate (NRR) calculator:
    NRR = (Runs Scored / Overs Faced) - (Runs Conceded / Overs Bowled)
    """
    if req.overs_faced <= 0 or req.overs_bowled <= 0:
        raise HTTPException(status_code=400, detail="Overs faced and overs bowled must be greater than zero.")

    # Convert cricket fractional overs (e.g. 19.3 -> 19 + 3/6)
    def to_balls(overs: float) -> int:
        whole = int(overs)
        balls = round((overs - whole) * 10)
        return (whole * 6) + balls

    balls_faced = to_balls(req.overs_faced)
    balls_bowled = to_balls(req.overs_bowled)

    exact_overs_faced = balls_faced / 6.0
    exact_overs_bowled = balls_bowled / 6.0

    rr_for = req.runs_scored / exact_overs_faced
    rr_against = req.runs_conceded / exact_overs_bowled
    nrr = rr_for - rr_against

    status = "POSITIVE" if nrr > 0 else "NEUTRAL" if nrr == 0 else "NEGATIVE"

    return NRRCalculationResponse(
        run_rate_for=round(rr_for, 4),
        run_rate_against=round(rr_against, 4),
        net_run_rate=round(nrr, 4),
        status=status
    )
