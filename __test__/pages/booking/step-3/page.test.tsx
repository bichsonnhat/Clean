import { render, screen, fireEvent } from "@testing-library/react";
import { useRouter } from "next/navigation";
import Step_3 from "@/app/(booking)/(routes)/booking/step-3/page";

jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

describe("Step_3 Component", () => {
  it("renders the component", () => {
    render(<Step_3 />);
    expect(screen.getByText("Book Timing")).toBeInTheDocument();
  });

  it("handles time slot selection", () => {
    render(<Step_3 />);

    // Check initial class for time button
    expect(screen.getByText("Flexible")).toHaveClass(
      "text-base font-Averta-Semibold leading-[23px] tracking-tight text-left"
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

  it("handle button next correctly", () => {
    const push = jest.fn();
    (useRouter as jest.Mock).mockReturnValue({ push }); // Set up mock push

    render(<Step_3 />);

    fireEvent.click(screen.getByRole("button", { name: "Next" })); // Use role for button
    expect(push).toHaveBeenCalledWith("/booking/step-4"); // Check navigation
  });
});