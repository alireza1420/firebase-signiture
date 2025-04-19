"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { db } from "@/lib/firebase"; // Import Firebase Firestore
import { collection, addDoc } from "firebase/firestore";
import { useRouter } from "next/navigation";

interface FormData {
  formName: string;
  consentForm: string;
  field1Title: string;
  field2Title: string;
  field3Title: string;
  field4Title: string;
  formType: "text" | "pdf";
  pdfFileName: string | null;
}

const initialFormData: FormData = {
  formName: "",
  consentForm: "",
  field1Title: "",
  field2Title: "",
  field3Title: "",
  field4Title: "",
  formType: "text",
  pdfFileName: null,
};

export default function AdminDashboard() {
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const { toast } = useToast();
  const [pdfFile, setPdfFile] = useState<File | null>(null);
  const router = useRouter();

  useEffect(() => {
    // Load data from local storage on component mount
    const storedFormData = localStorage.getItem("consentFormData");
    if (storedFormData) {
      setFormData(JSON.parse(storedFormData));
    }
  }, []);

  useEffect(() => {
    // Save data to local storage whenever formData changes
    localStorage.setItem("consentFormData", JSON.stringify(formData));
  }, [formData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  const handleFormTypeChange = (value: "text" | "pdf") => {
    setFormData({ ...formData, formType: value });
    if (value === "pdf") {
      setFormData({ ...formData, consentForm: "" });
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type === "application/pdf") {
      setPdfFile(file);
      setFormData({ ...formData, pdfFileName: file.name, consentForm: "" }); // Clear text area if PDF is uploaded
    } else {
      setPdfFile(null);
      setFormData({ ...formData, pdfFileName: null });
      toast({
        title: "Error",
        description: "Please upload a valid PDF file.",
      });
    }
  };

  const generateForm = async () => {
    let consentData;

    if (formData.formType === "text") {
      consentData = formData.consentForm;
    } else if (formData.formType === "pdf" && pdfFile) {
      consentData = pdfFile.name;
    } else {
      toast({
        title: "Error",
        description: "Please select consent form type and provide the consent form data.",
      });
      return;
    }

    // Generate a unique id (UUID)
        const uuid = crypto.randomUUID();
        const formURL = `/form/${uuid}`;
    
    const formContent = formData.consentForm;
    // Save form data to Firestore
    const formsCollection = collection(db, "consentForms");
    const formDataToSave = {
      formName: formData.formName,
      consentForm: consentData, // Ensure correct data is saved
      field1Title: formData.field1Title,
      field2Title: formData.field2Title,
      field3Title: formData.field3Title,
      field4Title: formData.field4Title,
      formType: formData.formType,
      pdfFileName: formData.pdfFileName,
      formURL: formURL,
      createdAt: new Date(),
    };

    await addDoc(formsCollection, formDataToSave);

    toast({
      title: "Form Saved",
      description: "Consent form data saved successfully.",
    });

    // Redirect to the new form
    router.push(formURL);
  };

  return (
    <div className="flex justify-center p-4">
      <Card className="w-full max-w-2xl">
        <CardHeader>
          <CardTitle>Create Consent Form</CardTitle>
          <CardDescription>
            Manage consent forms and generate secure links.
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="formName">Form Name</Label>
            <Input
              type="text"
              id="formName"
              placeholder="Enter form name..."
              value={formData.formName}
              onChange={handleChange}
            />
          </div>
          <div className="grid gap-2">
            <Label>Consent Form Type</Label>
            <RadioGroup
              defaultValue={formData.formType}
              className="flex flex-col space-y-1"
              onValueChange={handleFormTypeChange}
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="text" id="text" />
                <Label htmlFor="text">Text</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="pdf" id="pdf" />
                <Label htmlFor="pdf">PDF</Label>
              </div>
            </RadioGroup>
          </div>

          {formData.formType === "text" && (
            <div className="grid gap-2">
              <label htmlFor="consentForm">Consent Form Text</label>
              <Textarea
                id="consentForm"
                placeholder="Paste consent form text here..."
                value={formData.consentForm}
                onChange={handleChange}
              />
            </div>
          )}

          {formData.formType === "pdf" && (
            <div className="grid gap-2">
              <label htmlFor="pdfUpload">Upload PDF Consent Form</label>
              <Input
                type="file"
                id="pdfUpload"
                accept="application/pdf"
                onChange={handleFileChange}
              />
              {formData.pdfFileName && <p>Selected File: {formData.pdfFileName}</p>}
            </div>
          )}

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="field1Title">Field 1 Title (Before)</label>
              <Input
                type="text"
                id="field1Title"
                value={formData.field1Title}
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor="field2Title">Field 2 Title (Before)</label>
              <Input
                type="text"
                id="field2Title"
                value={formData.field2Title}
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor="field3Title">Field 3 Title (After)</label>
              <Input
                type="text"
                id="field3Title"
                value={formData.field3Title}
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor="field4Title">Field 4 Title (After)</label>
              <Input
                type="text"
                id="field4Title"
                value={formData.field4Title}
                onChange={handleChange}
              />
            </div>
          </div>
          <Button onClick={generateForm}>Generate Form</Button>
        </CardContent>
      </Card>
    </div>
  );
}
