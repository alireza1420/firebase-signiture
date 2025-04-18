"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { db } from "@/lib/firebase"; // Import Firebase Firestore
import { collection, getDocs } from "firebase/firestore";
import Link from 'next/link';

interface FormData {
    consentForm: string;
    field1Title: string;
    field2Title: string;
    field3Title: string;
    field4Title: string;
    formType: "text" | "pdf";
    pdfFileName: string | null;
    formURL: string; // Changed from link to formURL
    createdAt: Date;
}

export default function PreviousFormsPage() {
    const [previousForms, setPreviousForms] = useState<FormData[]>([]);

    useEffect(() => {
        const fetchForms = async () => {
            try {
                const formsCollection = collection(db, "consentForms");
                const formsSnapshot = await getDocs(formsCollection);
                const formsList = formsSnapshot.docs.map(doc => ({
                    ...doc.data() as FormData,
                    id: doc.id,
                }));
                setPreviousForms(formsList);
            } catch (error) {
                console.error("Error fetching forms from Firestore:", error);
            }
        };

        fetchForms();
    }, []);

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
                    {previousForms.length > 0 ? (
                        <ul>
                            {previousForms.map((form, index) => (
                                <li key={index} className="border rounded-md p-4">
                                    <h3 className="font-semibold">Form {index + 1}</h3>
                                    <p>Field 1 Title: {form.field1Title}</p>
                                    <p>Field 2 Title: {form.field2Title}</p>
                                    <p>Field 3 Title: {form.field3Title}</p>
                                    <p>Field 4 Title: {form.field4Title}</p>
                                    <p>Consent Form Type: {form.formType}</p>
                                    {form.pdfFileName && <p>PDF File Name: {form.pdfFileName}</p>}
                                    <p>
                                        Form Link:{' '}
                                        <Link href={form.formURL} target="_blank" rel="noopener noreferrer">
                                            {form.formURL}
                                        </Link>
                                    </p>
                                    {/* Add more details as needed */}
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p>No previous forms found.</p>
                    )}
                </CardContent>
            </Card>
        </div>
    );
}
