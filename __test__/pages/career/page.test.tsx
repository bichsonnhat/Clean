/**
 * @jest-environment jsdom
 */
import Career from "@/components/career/Career";
import { render, screen, fireEvent } from "@testing-library/react";
import { useRouter } from "next/navigation";

jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

describe("Career Component", () => {
  it("renders the Career page with all required sections", () => {
    render(<Career />);

    // Hero Section
    expect(screen.getByText("Treat Employees Like")).toBeInTheDocument();
    expect(screen.getByText("Your Own Customers")).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Join Our Team" })
    ).toBeInTheDocument();

    // Accreditations Section
    expect(screen.getByText("Our accreditions")).toBeInTheDocument();
    const logos = screen.getAllByAltText("ClientLogo");
    expect(logos.length).toBe(4);

    // Benefits Section
    expect(
      screen.getByText("What can Shield Cleaning do for you?")
    ).toBeInTheDocument();
    expect(screen.getByText("Health & Safety")).toBeInTheDocument();
    expect(screen.getByText("High Morale")).toBeInTheDocument();
    expect(screen.getByText("Save Money")).toBeInTheDocument();
    expect(screen.getByText("Full-service Partnership")).toBeInTheDocument();

    // Make a request Section
    expect(
      screen.getByText("The Ultimate Cleaning Companion")
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Request a Quote" })
    ).toBeInTheDocument();
  });

  it("handles Join Our Team button click", () => {
    const push = jest.fn();
    (useRouter as jest.Mock).mockReturnValue({ push });

    render(<Career />);

    const joinButton = screen.getByRole("button", { name: "Join Our Team" });
    fireEvent.click(joinButton);

    expect(push).toHaveBeenCalledWith("/sign-in");
  });

  it("handles Request a Quote button click", () => {
    const push = jest.fn();
    (useRouter as jest.Mock).mockReturnValue({ push });

    render(<Career />);

    const requestButton = screen.getByRole("button", {
      name: "Request a Quote",
    });
    fireEvent.click(requestButton);

    expect(push).toHaveBeenCalledWith("/ask-question");
  });

  it("displays the correct logos in the accreditation section", () => {
    render(<Career />);

    // Check the logos inside the accreditation section
    const logos = screen.getAllByAltText("ClientLogo");
    expect(logos).toHaveLength(4);
    logos.forEach((logo) => {
      expect(logo).toBeInTheDocument();
      expect(logo).toHaveAttribute("src");
    });
  });

  it("renders all benefits correctly", () => {
    render(<Career />);

    const benefitTitles = [
      "Health & Safety",
      "High Morale",
      "Save Money",
      "Full-service Partnership",
    ];

    benefitTitles.forEach((title) => {
      expect(screen.getByText(title)).toBeInTheDocument();
    });

    const descriptions = screen.getAllByText(/.*/);
    descriptions.forEach((description) => {
      expect(description).toBeInTheDocument();
    });
  });
});
