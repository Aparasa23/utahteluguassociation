/**
 * Python Core Engine Bridge for Utah Telugu Association
 * Communicates with the local FastAPI service on http://localhost:8000
 * with graceful fallback to local TypeScript calculations.
 */

const PYTHON_ENGINE_URL = process.env.PYTHON_ENGINE_URL || 'http://localhost:8000';

export interface PythonHealthStatus {
  status: string;
  modules?: {
    tournaments?: string;
    analytics?: string;
    communications?: string;
  };
}

export class PythonBridge {
  static async checkHealth(): Promise<boolean> {
    try {
      const res = await fetch(`${PYTHON_ENGINE_URL}/api/py/health`, {
        signal: AbortSignal.timeout(1500),
      });
      return res.ok;
    } catch {
      return false;
    }
  }

  static async generateTournamentBracket(payload: {
    tournament_name: string;
    teams: Array<{ id: string; name: string; seed?: number }>;
    courts_available?: number;
  }) {
    try {
      const res = await fetch(`${PYTHON_ENGINE_URL}/api/py/tournaments/generate-bracket`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          tournament_name: payload.tournament_name,
          teams: payload.teams,
          courts_available: payload.courts_available || 2,
        }),
        signal: AbortSignal.timeout(3000),
      });
      if (res.ok) {
        return await res.json();
      }
    } catch (err) {
      console.warn('Python engine unavailable, using fallback bracket logic:', err);
    }
    return null;
  }

  static async calculateNetRunRate(payload: {
    runs_scored: number;
    overs_faced: number;
    runs_conceded: number;
    overs_bowled: number;
  }) {
    try {
      const res = await fetch(`${PYTHON_ENGINE_URL}/api/py/tournaments/calculate-nrr`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
        signal: AbortSignal.timeout(3000),
      });
      if (res.ok) {
        return await res.json();
      }
    } catch (err) {
      console.warn('Python engine unavailable for NRR calculation:', err);
    }
    // Fallback calculation in TypeScript
    const rrFor = payload.runs_scored / (payload.overs_faced || 1);
    const rrAgainst = payload.runs_conceded / (payload.overs_bowled || 1);
    return {
      run_rate_for: Math.round(rrFor * 1000) / 1000,
      run_rate_against: Math.round(rrAgainst * 1000) / 1000,
      net_run_rate: Math.round((rrFor - rrAgainst) * 1000) / 1000,
      status: rrFor >= rrAgainst ? 'POSITIVE' : 'NEGATIVE',
    };
  }

  static async synthesizeAnnouncement(payload: {
    event_title: string;
    telugu_title?: string;
    date_str: string;
    venue_name: string;
    city?: string;
    registration_url: string;
    highlights: string[];
  }) {
    try {
      const res = await fetch(`${PYTHON_ENGINE_URL}/api/py/communications/synthesize-announcement`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
        signal: AbortSignal.timeout(3000),
      });
      if (res.ok) {
        return await res.json();
      }
    } catch (err) {
      console.warn('Python engine unavailable for announcement synthesis:', err);
    }
    return null;
  }
}
