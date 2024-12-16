/**
 * @jest-environment jsdom
 */
import About from "@/components/about/about";
import { render, screen, fireEvent } from "@testing-library/react";
import { useRouter } from "next/navigation";

jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

describe("About Component", () => {
  it("renders the hero section with correct text", () => {
    render(<About />);

    // Hero Section
    expect(screen.getByText("About Us")).toBeInTheDocument();
  });

  it("renders the story section with detailed content", () => {
    render(<About />);

    // Story Section
    expect(
      screen.getByText("The Shield Cleaning.Co Story")
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        "Our story began in 2014 when we relized there's no convenient way for us to find cleaners in a simple manner. We take our jobs very seriously, just ask the 10,000+ recuring customers who keep coming back for our professional services. We use a combination of enterprise grade technology and technical cleaning methods to ensure that your house, office or commercial setting is as good as new, healthy and clean - when we're done."
      )
    ).toBeInTheDocument();
  });

  it("renders the working hours section correctly", () => {
    render(<About />);

    // Working Hours Section
    expect(screen.getByText("Monday - Friday")).toBeInTheDocument();
    expect(screen.getByText("8 AM - 9 PM")).toBeInTheDocument();
    expect(screen.getByText("Saturday")).toBeInTheDocument();
    expect(screen.getByText("8 AM - 6 PM")).toBeInTheDocument();
    expect(screen.getByText("Sunday")).toBeInTheDocument();
    expect(screen.getByText("8 AM - 2 PM")).toBeInTheDocument();
  });

  it("renders the contact information with icons", () => {
    render(<About />);

    // Contact Section
    expect(
      screen.getByText(
        "Quarter 6, Linh Trung Ward, Thu Duc City, Ho Chi Minh City"
      )
    ).toBeInTheDocument();
    expect(screen.getByText("(+84) 123 456 789")).toBeInTheDocument();
    expect(screen.getByText("contact@group1.com")).toBeInTheDocument();
  });

  it("renders the footer booking section with button", () => {
    render(<About />);

    // Footer Section
    expect(
      screen.getByText("Servicing 10K+ Users Across Your City")
    ).toBeInTheDocument();
    const bookingButton = screen.getAllByRole("button", {
      name: "Booking from 80$",
    });
    expect(bookingButton[0]).toBeInTheDocument();
  });

  it("handles booking button click correctly", () => {
    const push = jest.fn();
    (useRouter as jest.Mock).mockReturnValue({ push }); // Mock push function

    render(<About />);

    const bookingButton = screen.getAllByRole("button", {
      name: "Booking from 80$",
    })[0];
    fireEvent.click(bookingButton);
    expect(push).toHaveBeenCalledWith("/select");
  });
});
