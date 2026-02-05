import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BookType, ChevronRight } from "lucide-react";

export default function Exams() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">My Exams</h1>
        <p className="text-muted-foreground text-sm mt-1">
          Create and take exams from your course content
        </p>
      </div>

      <Card className="rounded-2xl border border-border overflow-hidden">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BookType className="h-5 w-5" />
            Get Started
          </CardTitle>
          <p className="text-sm text-muted-foreground">
            Generate exam-style assessments from your course materials. Exams include more questions and stricter scoring.
          </p>
        </CardHeader>
        <CardContent>
          <Link to="/dashboard">
            <Button>
              Go to Dashboard
              <ChevronRight className="h-4 w-4 ml-2" />
            </Button>
          </Link>
          <p className="text-sm text-muted-foreground mt-4">
            Create a course, upload documents, then generate an exam from the Quiz tab (select &quot;exam&quot; type).
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
