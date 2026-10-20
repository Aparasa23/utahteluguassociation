from fastapi import APIRouter
from pydantic import BaseModel, Field
from typing import List, Dict, Any

router = APIRouter(prefix="/api/py/analytics", tags=["Association Analytics & Forecasting"])

class FinancialForecastRequest(BaseModel):
    current_active_members: int = Field(default=350, ge=1)
    projected_member_growth_percent: float = Field(default=15.0)
    average_membership_fee: float = Field(default=50.0)
    expected_event_ticket_revenue: float = Field(default=28000.0)
    confirmed_sponsorship_revenue: float = Field(default=18000.0)
    projected_annual_expenses: float = Field(default=42000.0)
    contingency_reserve_ratio: float = Field(default=0.15, description="Recommended 10-20% for 501(c)(3)")

class FinancialForecastResponse(BaseModel):
    projected_membership_revenue: float
    total_projected_revenue: float
    total_projected_expenses: float
    projected_net_operating_surplus: float
    mandatory_reserve_fund: float
    free_cashflow_for_cultural_grants: float
    status: str
    insights: List[str]

class CohortRetentionRequest(BaseModel):
    total_members_start_of_year: int
    renewed_members_count: int
    newly_joined_members_count: int
    average_family_size: float = Field(default=3.4)

class CohortRetentionResponse(BaseModel):
    retention_rate_percent: float
    churn_rate_percent: float
    total_community_reach_souls: int
    growth_velocity: str
    recommendations: List[str]

@router.post("/financial-forecast", response_model=FinancialForecastResponse)
def calculate_financial_forecast(req: FinancialForecastRequest):
    """
    Computes annual financial projections, reserve allocations, and cashflow modeling
    for non-profit board reporting.
    """
    growth_multiplier = 1.0 + (req.projected_member_growth_percent / 100.0)
    projected_members = round(req.current_active_members * growth_multiplier)
    membership_revenue = projected_members * req.average_membership_fee

    total_revenue = (
        membership_revenue
        + req.expected_event_ticket_revenue
        + req.confirmed_sponsorship_revenue
    )

    net_surplus = total_revenue - req.projected_annual_expenses
    reserve_fund = total_revenue * req.contingency_reserve_ratio
    free_cash = max(0.0, net_surplus - reserve_fund)

    status = "HEALTHY" if net_surplus >= reserve_fund else "MODERATE" if net_surplus > 0 else "DEFICIT_WARNING"

    insights = [
        f"Projected membership count: {projected_members} active Telugu families.",
        f"Membership dues account for {round((membership_revenue / total_revenue) * 100, 1)}% of total revenues.",
        f"Recommended non-profit emergency reserve: ${reserve_fund:,.2f} USD.",
        f"Available cultural endowment & youth workshop surplus: ${free_cash:,.2f} USD."
    ]

    return FinancialForecastResponse(
        projected_membership_revenue=round(membership_revenue, 2),
        total_projected_revenue=round(total_revenue, 2),
        total_projected_expenses=round(req.projected_annual_expenses, 2),
        projected_net_operating_surplus=round(net_surplus, 2),
        mandatory_reserve_fund=round(reserve_fund, 2),
        free_cashflow_for_cultural_grants=round(free_cash, 2),
        status=status,
        insights=insights
    )

@router.post("/retention-cohorts", response_model=CohortRetentionResponse)
def calculate_retention_cohorts(req: CohortRetentionRequest):
    """
    Computes cohort retention rates, community reach headcounts, and recommendations.
    """
    if req.total_members_start_of_year <= 0:
        retention = 100.0
        churn = 0.0
    else:
        retention = (req.renewed_members_count / req.total_members_start_of_year) * 100.0
        churn = max(0.0, 100.0 - retention)

    total_members_now = req.renewed_members_count + req.newly_joined_members_count
    total_souls = round(total_members_now * req.average_family_size)

    velocity = "RAPID_EXPANSION" if total_members_now > req.total_members_start_of_year * 1.1 else "STEADY_STATE"

    recs = [
        f"Community footprint touches ~{total_souls} individuals across the Wasatch Front.",
        f"Annual member retention stands at {retention:.1f}%.",
        "Recommended action: Launch automated Sankranthi early-bird renewal campaign 60 days prior to festival season."
    ]

    return CohortRetentionResponse(
        retention_rate_percent=round(retention, 2),
        churn_rate_percent=round(churn, 2),
        total_community_reach_souls=total_souls,
        growth_velocity=velocity,
        recommendations=recs
    )
