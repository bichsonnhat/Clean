/**
 * @jest-environment jsdom
 */
import HomePage from "@/components/homepage/HomePage";
import { render, screen, fireEvent } from "@testing-library/react";
import { useRouter } from "next/navigation";

jest.mock("next/navigation", () => ({
    useRouter: jest.fn(),
}));


describe("HomePage Component", () => {
  it("renders the component with all sections", () => {
    render(<HomePage />);

    // Hero Section
    expect(screen.getByText("Your One Stop Cleaning")).toBeInTheDocument();
    expect(screen.getByText("Centre For All Needs")).toBeInTheDocument();
    expect(screen.getAllByRole("button", { name: "Booking from 80$" })[0]).toBeInTheDocument();

    // Why Choose Us Section
    expect(screen.getByText("Why Choose Us?")).toBeInTheDocument();
    expect(screen.getByText("Sparkling clean home:")).toBeInTheDocument();
    expect(screen.getByText("More time for you:")).toBeInTheDocument();
    expect(screen.getByText("Healthy living:")).toBeInTheDocument();
    // expect(screen.getByText("1.250+ happy customers")).toBeInTheDocument();
    expect(
      screen.getByText(
        "We understand your home is important to you. That's why we focus on the quality of the clean. Our cleaners aren't contract workers - they are full-time employees. They care as much as we do."
      )
    ).toBeInTheDocument();

     // Process Section
    expect(screen.getByText("Book")).toBeInTheDocument();
    expect(screen.getByText("Clean")).toBeInTheDocument();
    expect(screen.getByText("Freedom")).toBeInTheDocument();
    expect(screen.getByText("Tell us when and where you want your clean.")).toBeInTheDocument();
    expect(screen.getByText("A Professional cleaner comes over and cleans your place.")).toBeInTheDocument();
    expect(screen.getByText("Enjoy your life and come back to a clean space!")).toBeInTheDocument();

    // Feedback Section
    expect(screen.getByText("What our customers say?")).toBeInTheDocument();
    expect(screen.getByText("HurryKhang")).toBeInTheDocument();
    expect(screen.getByText("HuyRui")).toBeInTheDocument();

    // Footer Booking Section
    expect(screen.getAllByRole("button", { name: "Booking from 80$" })[1]).toBeInTheDocument();

  });

  it("handle button next correctly", () => {
        const push = jest.fn();
        (useRouter as jest.Mock).mockReturnValue({ push }); // Set up mock push

        render(<HomePage />);

        const bookingButton = screen.getAllByRole("button", { name: "Booking from 80$" })[0];
        fireEvent.click(bookingButton); 
        expect(push).toHaveBeenCalledWith("/select"); // Check navigation
    });
});