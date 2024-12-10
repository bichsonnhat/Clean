import { render, screen, fireEvent } from "@testing-library/react";
import { useRouter } from "next/navigation";
import { bookingStore } from '@/utils/store/booking.store';
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel"
import Step_3 from "@/app/(booking)/(routes)/booking/step-3/page";

describe("Step_3 Component", () => {
  it("renders the component", () => {
    render(<Step_3 />);
    expect(screen.getByText("Book Timing")).toBeInTheDocument();
  });

  it("handles time slot selection", () => {
    render(<Step_3 />);

    // Check initial selection (Flexible should be selected by default)
    expect(screen.getByText("Flexible")).toHaveClass(
      "border-[#1A78F2] text-[#1A78F2]"
    );

    // Click on a standard time slot (e.g., 08:00am)
    fireEvent.click(screen.getByText("08:00am"));

    // Verify that the clicked time slot is now selected
    expect(screen.getByText("08:00am")).toHaveClass(
      "border-[#1A78F2] text-[#1A78F2]"
    );

    // Verify that "Flexible" is no longer selected
    expect(screen.getByText("Flexible")).not.toHaveClass(
      "border-[#1A78F2] text-[#1A78F2]"
    );
  });

  it("renders time slots correctly", () => {
    render(<Step_3 />);

    // Check if specific time slot is rendered
    expect(screen.getByText("Flexible")).toBeInTheDocument();
    expect(screen.getByText("08:00am")).toBeInTheDocument();
    expect(screen.getByText("08:30am")).toBeInTheDocument();
    // ... add assertions for other time slots
  });
});