"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

export default function PreviousFormsPage() {
    return (
        <div className="flex justify-center p-4">
            <Card className="w-full max-w-2xl">
                <CardHeader>
                    <CardTitle>Previous Forms</CardTitle>
                    <CardDescription>
                        View and manage previously created consent forms.
                    </CardDescription>
                </CardHeader>
                <CardContent className="grid gap-4">
                    {/* Add logic to fetch and display previous forms here */}
                    <p>This is where previous forms will be displayed.</p>
                </CardContent>
            </Card>
        </div>
    );
}
