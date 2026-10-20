import { NextRequest, NextResponse } from 'next/server';
import { ParticipantProofreaderEngine, PerformanceSubmission } from '@/lib/automation/proofreader';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const submission = body.submission as PerformanceSubmission;

    if (!submission) {
      return NextResponse.json({ error: 'Missing submission payload' }, { status: 400 });
    }

    const proofreadResult = ParticipantProofreaderEngine.proofreadSubmission(submission, []);

    return NextResponse.json({
      success: true,
      result: proofreadResult,
    });
  } catch (error: any) {
    return NextResponse.json(
      { error: error?.message || 'Failed to proofread submission' },
      { status: 500 }
    );
  }
}
