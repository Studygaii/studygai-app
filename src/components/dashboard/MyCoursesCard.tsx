import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { GripVertical, CheckSquare, Plus, Maximize2, MoreHorizontal } from "lucide-react";

interface Course {
  id: string;
  title: string;
  professor: string;
  color: string;
  textColor: string;
}

const courses: Course[] = [
  {
    id: "1",
    title: "Calculus 101",
    professor: "Dr. Amelia Carter",
    color: "bg-[#A7D8CD]", // Soft Teal
    textColor: "text-[#3A7D71]",
  },
  {
    id: "2",
    title: "World History",
    professor: "Dr. Ethan Clark",
    color: "bg-[#1E3F3B]", // Dark Green
    textColor: "text-[#E0E7E5]",
  },
  {
    id: "3",
    title: "Biology",
    professor: "Dr. Olivia Bennett",
    color: "bg-[#0EA5E9]", // Sky Blue
    textColor: "text-white",
  },
  {
    id: "4",
    title: "Physics",
    professor: "Dr. Michael Davis",
    color: "bg-[#F97316]", // Orange
    textColor: "text-white",
  },
  {
    id: "5",
    title: "Chemistry",
    professor: "Dr. Sarah Johnson",
    color: "bg-[#FFC107]", // Gold
    textColor: "text-white",
  },
  {
    id: "6",
    title: "Statistics",
    professor: "Dr. William Brown",
    color: "bg-[#60A5FA]", // Light Blue
    textColor: "text-white",
  },
];

export function MyCoursesCard() {
  return (
    <Card className="rounded-2xl shadow-sm border border-border animate-fade-in overflow-hidden">
      <CardHeader className="flex flex-row items-center justify-between pb-2 px-6 pt-6">
        <div className="flex items-center gap-3">
          <GripVertical className="h-4 w-4 text-muted-foreground/50 cursor-grab" />
          <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center">
            <CheckSquare className="h-4 w-4 text-primary" />
          </div>
          <CardTitle className="text-lg font-semibold">My Courses</CardTitle>
        </div>
        <div className="flex items-center gap-1">
          <button className="p-2 hover:bg-muted rounded-lg transition-colors group">
            <Plus className="h-4 w-4 text-muted-foreground group-hover:text-foreground" />
          </button>
          <button className="p-2 hover:bg-muted rounded-lg transition-colors group">
            <Maximize2 className="h-4 w-4 text-muted-foreground group-hover:text-foreground" />
          </button>
          <button className="p-2 hover:bg-muted rounded-lg transition-colors group">
            <MoreHorizontal className="h-4 w-4 text-muted-foreground group-hover:text-foreground" />
          </button>
        </div>
      </CardHeader>

      <CardContent className="p-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map((course) => (
            <div key={course.id} className="group cursor-pointer">
              {/* Card Image Container */}
              <div className="bg-secondary/30 rounded-2xl p-8 mb-4 flex items-center justify-center aspect-square relative group-hover:bg-secondary/50 transition-colors">

                {/* Book Effect CSS */}
                <div className={`relative w-4/5 h-[90%] rounded-r-lg shadow-xl transition-transform duration-300 group-hover:-translate-y-1 group-hover:shadow-2xl ${course.color}`}>
                  {/* Spine */}
                  <div className="absolute left-0 top-0 bottom-0 w-2.5 bg-black/10 rounded-l-sm z-10 border-r border-white/10" />

                  {/* Book Cover Details */}
                  <div className="absolute flex flex-col items-center justify-center w-full h-full p-4 text-center">
                    <span className={`text-[10px] uppercase tracking-wider font-semibold opacity-70 mb-8 ${course.textColor}`}>
                      Course Book
                    </span>

                    <h4 className={`font-serif text-lg leading-tight mb-2 ${course.textColor}`}>
                      {course.title === "Calculus 101" ? (
                        <div className="font-handwriting opacity-80 rotate-[-5deg]">
                          CC + CC <br /> + 2 = 5 <br /> √x / = 2
                        </div>
                      ) : (
                        course.title
                      )}
                    </h4>

                    {course.title === "Biology" && (
                      <span className="text-[10px] mt-2 opacity-80 text-white border border-white/30 px-2 py-0.5 rounded-full">
                        Science
                      </span>
                    )}

                    {/* Bottom branding */}
                    <div className="mt-auto opacity-50">
                      <div className={`h-1 w-6 rounded-full mx-auto ${course.textColor === 'text-white' ? 'bg-white' : 'bg-current'}`} />
                    </div>
                  </div>
                </div>

                {/* Decorative circle for Biology */}
                {course.title === "Biology" && (
                  <div className="absolute right-6 bg-[#E5D5C6] h-6 w-6 rounded-full border-4 border-white/50 shadow-sm" />
                )}
              </div>

              {/* Info */}
              <div>
                <h3 className="font-bold text-lg leading-tight mb-1 group-hover:text-primary transition-colors">{course.title}</h3>
                <p className="text-sm text-muted-foreground">Professor: {course.professor}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
