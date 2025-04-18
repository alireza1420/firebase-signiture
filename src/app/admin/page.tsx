"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

export default function AdminDashboard() {
  const [consentForm, setConsentForm] = useState("");
  const [link, setLink] = useState("");
  const [field1Title, setField1Title] = useState("");
  const [field2Title, setField2Title] = useState("");
  const [field3Title, setField3Title] = useState("");
  const [field4Title, setField4Title] = useState("");
  const { toast } = useToast();
  const [formType, setFormType] = useState("text"); // 'text' or 'pdf'
    const [pdfFile, setPdfFile] = useState<File | null>(null);
    const [pdfFileName, setPdfFileName] = useState<string | null>(null);

  const generateLink = () => {
      let consentData;

      if (formType === "text") {
          consentData = consentForm;
      } else if (formType === "pdf" && pdfFile) {
          consentData = pdfFile.name;
      } else {
          toast({
              title: "Error",
              description: "Please select consent form type and provide the consent form data.",
          });
          return;
      }

    // Generate a unique link (UUID)
    const uuid = crypto.randomUUID();
    setLink(`${window.location.origin}/form/${uuid}`);
      toast({
          title: "Link Generated",
          description: "Successfully generated a unique link for the consent form.",
      });
  };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file && file.type === "application/pdf") {
            setPdfFile(file);
            setPdfFileName(file.name);
            setConsentForm(""); // Clear text area if PDF is uploaded
        } else {
            setPdfFile(null);
            setPdfFileName(null);
            toast({
                title: "Error",
                description: "Please upload a valid PDF file.",
            });
        }
    };


  return (
    <div className="flex justify-center p-4">
      <Card className="w-full max-w-2xl">
        <CardHeader>
          <CardTitle>Admin Dashboard</CardTitle>
          <CardDescription>
            Manage consent forms and generate secure links.
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">

            <div className="grid gap-2">
                <Label>Consent Form Type</Label>
                <RadioGroup defaultValue="text" className="flex flex-col space-y-1" onValueChange={(value) => {
                    setFormType(value);
                    if (value === "pdf") {
                        setConsentForm("");
                    }
                }}>
                    <div className="flex items-center space-x-2">
                        <RadioGroupItem value="text" id="text"/>
                        <Label htmlFor="text">Text</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                        <RadioGroupItem value="pdf" id="pdf"/>
                        <Label htmlFor="pdf">PDF</Label>
                    </div>
                </RadioGroup>
            </div>

            {formType === "text" && (
                <div className="grid gap-2">
                    <label htmlFor="consentForm">Consent Form Text</label>
                    <Textarea
                        id="consentForm"
                        placeholder="Paste consent form text here..."
                        value={consentForm}
                        onChange={(e) => setConsentForm(e.target.value)}
                    />
                </div>
            )}

            {formType === "pdf" && (
                <div className="grid gap-2">
                    <label htmlFor="pdfUpload">Upload PDF Consent Form</label>
                    <Input
                        type="file"
                        id="pdfUpload"
                        accept="application/pdf"
                        onChange={handleFileChange}
                    />
                    {pdfFileName && <p>Selected File: {pdfFileName}</p>}
                </div>
            )}


          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="field1Title">Field 1 Title (Before)</label>
              <Input
                type="text"
                id="field1Title"
                value={field1Title}
                onChange={(e) => setField1Title(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="field2Title">Field 2 Title (Before)</label>
              <Input
                type="text"
                id="field2Title"
                value={field2Title}
                onChange={(e) => setField2Title(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="field3Title">Field 3 Title (After)</label>
              <Input
                type="text"
                id="field3Title"
                value={field3Title}
                onChange={(e) => setField3Title(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="field4Title">Field 4 Title (After)</label>
              <Input
                type="text"
                id="field4Title"
                value={field4Title}
                onChange={(e) => setField4Title(e.target.value)}
              />
            </div>
          </div>
          <Button onClick={generateLink}>Generate Link</Button>
          {link && (
            <div className="grid gap-2">
              <label htmlFor="link">Generated Link</label>
              <Input
                type="text"
                id="link"
                value={link}
                readOnly
              />
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
