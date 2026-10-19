export function formatCurrency(cents: number, trimZeros = false): string {
  const dollars = cents / 100;
  if (trimZeros && dollars % 1 === 0) {
    return `$${dollars.toLocaleString()}`;
  }
  return `$${dollars.toLocaleString(undefined, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
}

export function formatPercent(numerator: number, denominator: number): string {
  if (!denominator || denominator <= 0) return '0%';
  const pct = Math.min(100, Math.round((numerator / denominator) * 100));
  return `${pct}%`;
}

export function formatCompactNumber(num: number): string {
  if (num >= 1_000_000) {
    return (num / 1_000_000).toFixed(1).replace(/\.0$/, '') + 'M';
  }
  if (num >= 1_000) {
    return (num / 1_000).toFixed(1).replace(/\.0$/, '') + 'k';
  }
  return num.toLocaleString();
}

export function formatDaysRemaining(fundingEndsAt?: string): string {
  if (!fundingEndsAt) return 'Ongoing';
  const end = new Date(fundingEndsAt).getTime();
  const now = Date.now();
  const diffDays = Math.ceil((end - now) / (1000 * 60 * 60 * 24));

  if (diffDays <= 0) return 'Funding ended';
  if (diffDays === 1) return '1 day left';
  return `${diffDays} days left`;
}

export function formatRelativeTime(dateString: string): string {
  const date = new Date(dateString).getTime();
  const now = Date.now();
  const diffMinutes = Math.floor((now - date) / (1000 * 60));

  if (diffMinutes < 1) return 'Just now';
  if (diffMinutes < 60) return `${diffMinutes}m ago`;
  const diffHours = Math.floor(diffMinutes / 60);
  if (diffHours < 24) return `${diffHours}h ago`;
  const diffDays = Math.floor(diffHours / 24);
  if (diffDays === 1) return 'Yesterday';
  if (diffDays < 7) return `${diffDays}d ago`;
  return new Date(dateString).toLocaleDateString(undefined, {
    month: 'short',
    day: 'numeric',
  });
}

export function formatNumber(num: number): string {
  return num.toLocaleString();
}

export function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}
