import CalendarComponent from "@/components/CalendarComponent";
import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar";

export default function calendarPage() {
  return (
    <>
      <Navbar />
      <div className="mt-12 mb-20">
        {" "}
        {/* Adds 48px top and 80px bottom space */}
        <CalendarComponent />
      </div>
      <Footer />
    </>
  );
}
