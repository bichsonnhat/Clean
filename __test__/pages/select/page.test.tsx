import Select from "@/app/(select)/select/page";
import { render, screen, fireEvent } from '@testing-library/react';
import { useRouter } from "next/navigation";

jest.mock("next/navigation", () => ({
    useRouter: jest.fn(),
}));

describe("select service page", () => {
    it("renders the component", () => {
        render(<Select />);
        
        expect(
            screen.getByText("Find the Perfect Service for You!")
        ).toBeInTheDocument();

        expect(
            screen.getByText("Find the Perfect Service for You!")
        ).toHaveClass("text-[#12153a] text-[58px] font-Averta-Semibold leading-[65px] text-center");
    });

    it("handles div navigation correctly", () => {
        const push = jest.fn();
        (useRouter as jest.Mock).mockReturnValue({ push }); // Mock the router
    
        render(<Select />);
    
        // Use data-testid to target the div
        const clickableDiv = screen.getAllByTestId("select-service-div");
        
        clickableDiv.forEach((div) => {
            fireEvent.click(div); // Simulate clicking the div
            expect(push).toHaveBeenCalledWith("/booking/step-1"); // Assert navigation
        })

        expect(push).toHaveBeenCalledTimes(clickableDiv.length); // Check that the navigation was called the correct number of times
      });
});