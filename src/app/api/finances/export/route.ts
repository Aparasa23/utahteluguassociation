import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const entries = await prisma.financialEntry.findMany({
      orderBy: { transactedAt: 'desc' },
      include: { budget: true },
    });

    const headers = ['Entry ID', 'Type', 'Category', 'Amount (USD)', 'Description', 'Reference Code', 'Reconciled', 'Date (MDT)'];
    const rows = entries.map((e) => [
      e.id,
      e.entryType,
      e.category,
      e.amount.toFixed(2),
      `"${e.description.replace(/"/g, '""')}"`,
      e.paymentRef || 'N/A',
      e.reconciled ? 'YES' : 'PENDING',
      e.transactedAt.toISOString().split('T')[0],
    ]);

    const csvContent = [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');

    return new NextResponse(csvContent, {
      status: 200,
      headers: {
        'Content-Type': 'text/csv; charset=utf-8',
        'Content-Disposition': 'attachment; filename="UTA_Financial_Report_2026_2027.csv"',
      },
    });
  } catch (error: any) {
    console.error('Error generating CSV export:', error);
    return NextResponse.json({ error: 'Failed to generate financial export.' }, { status: 500 });
  }
}
