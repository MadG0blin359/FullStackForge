import React from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

export function BlockSkeleton() {
  return (
    <Card className="border-border/60 shadow-xs bg-card/60 animate-pulse">
      <CardHeader className="pb-3">
        <div className="flex items-center gap-2">
          <div className="h-6 w-6 rounded-md bg-muted" />
          <div className="h-5 w-48 rounded-md bg-muted" />
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="h-4 w-full rounded-md bg-muted" />
        <div className="h-4 w-5/6 rounded-md bg-muted" />
        <div className="h-4 w-3/4 rounded-md bg-muted" />
        <div className="flex justify-end pt-2">
          <div className="h-5 w-16 rounded-md bg-muted" />
        </div>
      </CardContent>
    </Card>
  );
}
