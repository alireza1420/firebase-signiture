
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

interface FormData {
  field1: string;
  field2: string;
  field3: string;
  field4: string;
}

export default function ConsentForm({ params }: { params: { id: string } }) {
  const [formData, setFormData] = useState<FormData>({
    field1: "",
    field2: "",
    field3: "",
    field4: "",
  });
  const [consent, setConsent] = useState<boolean | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>, field: keyof FormData) => {
    setFormData({ ...formData, [field]: e.target.value });
  };

  const handleSubmit = (consentValue: boolean) => {
    setConsent(consentValue);
    // Here you would typically send the form data and consent value to your backend
    console.log("Form Data:", formData);
    console.log("Consent:", consentValue);
  };

  return (
    <div className="flex justify-center p-4">
      <Card className="w-full max-w-2xl">
        <CardHeader>
          <CardTitle>Consent Form</CardTitle>
          <CardDescription>
            Please fill out the form and review the consent form below.
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="field1">Field 1</label>
              <Input
                type="text"
                id="field1"
                value={formData.field1}
                onChange={(e) => handleChange(e, "field1")}
              />
            </div>
            <div>
              <label htmlFor="field2">Field 2</label>
              <Input
                type="text"
                id="field2"
                value={formData.field2}
                onChange={(e) => handleChange(e, "field2")}
              />
            </div>
          </div>

          <div>
            <label htmlFor="consentForm">Consent Form</label>
            <div className="border rounded-md p-4">
              {/* Display consent form content here */}
              <p>
                This is the consent form content. Replace this with the actual
                content.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="field3">Field 3</label>
              <Input
                type="text"
                id="field3"
                value={formData.field3}
                onChange={(e) => handleChange(e, "field3")}
              />
            </div>
            <div>
              <label htmlFor="field4">Field 4</label>
              <Input
                type="text"
                id="field4"
                value={formData.field4}
                onChange={(e) => handleChange(e, "field4")}
              />
            </div>
          </div>

          <div className="flex justify-between">
            <Button onClick={() => handleSubmit(true)} variant="primary">
              Consent
            </Button>
            <Button onClick={() => handleSubmit(false)} variant="destructive">
              Decline
            </Button>
          </div>

          {consent !== null && (
            <div className="text-center">
              {consent ? (
                <p className="text-green-500">You have consented.</p>
              ) : (
                <p className="text-red-500">You have declined.</p>
              )}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
