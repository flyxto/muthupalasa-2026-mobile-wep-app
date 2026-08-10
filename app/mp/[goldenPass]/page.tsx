import React from 'react';
import { MainFlow } from '@/components/MainFlow';

interface GoldenPassPageProps {
  params: Promise<{ goldenPass: string }>;
}

export default async function GoldenPassPage({ params }: GoldenPassPageProps) {
  const resolvedParams = await params;
  const goldenPass = resolvedParams?.goldenPass;

  return <MainFlow goldenPass={goldenPass} />;
}
