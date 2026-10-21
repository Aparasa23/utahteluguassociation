import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getSession } from '@/lib/auth';
import { hasPermission } from '@/lib/rbac';

export async function GET() {
  try {
    // 1. Enforce verified request session
    const session = await getSession();
    if (!session) {
      return NextResponse.json(
        { error: 'Authentication required to access association financial statements.' },
        { status: 401 }
      );
    }

    // 2. Enforce explicit server-side authorization check (least privilege)
    const canExport = hasPermission(session.user.roles, 'finances', 'export');
    if (!canExport) {
      return NextResponse.json(
        { error: 'Forbidden: You do not possess authorized financial export privileges.' },
        { status: 403 }
      );
    }

    // 3. Query financial entries
    const entries = await prisma.financialEntry.findMany({
      orderBy: { transactedAt: 'desc' },
      include: { budget: true },
    });

    const headers = [
      'Entry ID',
      'Type',
      'Category',
      'Amount (USD)',
      'Description',
      'Reference Code',
      'Reconciled',
      'Date (MDT)',
    ];

    const rows = entries.map((e) => [
      e.id,
      e.entryType,
      e.category,
      e.amount.toFixed(2),
      `"${e.description.replace(/"/g, '""')}"`,
      e.paymentRef || 'N/A',
      e.reconciled ? 'YES' : 'PENDING',
      e.transactedAt ? new Date(e.transactedAt).toISOString().split('T')[0] : 'N/A',
    ]);

    const csvContent = [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');

    // 4. Log audit record
    try {
      await prisma.auditLog.create({
        data: {
          userId: session.user.id,
          actorEmail: session.user.email,
          action: 'FINANCIAL_EXPORT',
          targetType: 'FinancialEntry',
          targetId: 'ALL',
          details: JSON.stringify({
            exportedBy: session.user.email,
            recordCount: entries.length,
            transactedAt: new Date().toISOString(),
          }),
        },
      });
    } catch {
      // Non-blocking audit fallback
    }

    return new NextResponse(csvContent, {
      status: 200,
      headers: {
        'Content-Type': 'text/csv; charset=utf-8',
        'Content-Disposition': 'attachment; filename="UTA_Financial_Report_2026_2027.csv"',
      },
    });
  } catch (error: any) {
    console.error('Error generating financial export:', error);
    return NextResponse.json(
      { error: 'Failed to generate financial export.' },
      { status: 500 }
    );
  }
}
