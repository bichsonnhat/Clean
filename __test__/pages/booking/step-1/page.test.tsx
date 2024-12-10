import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import "@testing-library/jest-dom"
import test, { beforeEach, describe } from 'node:test';
import HomeCleaning from '@/components/step-1/HomeCleaning';
import OtherServices from '@/components/step-1/OtherServices';
import { useRouter } from 'next/navigation';

jest.mock("next/navigation", () => ({
    useRouter: jest.fn(),
}));

describe("HomeCleaning/OtherService Component", () => {
    it("renders the component", () => {
        render(<HomeCleaning />);
        expect(
            screen.getByText("Customize Your Requirements")
        ).toBeInTheDocument();
    });
  
    it("renders bedroom options correctly", () => {
        render(<HomeCleaning />);
        const bedOptions = ["Studio", "1", "2", "3", "4", "5"];
        bedOptions.forEach((option) => {
          expect(screen.getByTestId(`bed-option-${option}`)).toBeInTheDocument();
        });
    });
      
    it("renders bathroom options correctly", () => {
        render(<HomeCleaning />);
        const bathroomOptions = ["1", "2", "3", "4", "5"];
        bathroomOptions.forEach((option) => {
            expect(screen.getByTestId(`bathroom-option-${option}`)).toBeInTheDocument();
        });
    });
  
    it("renders clean type options correctly", () => {
        render(<HomeCleaning />);
        const cleanTypes = ["Standard", "Deep Clean", "Post-Party", "Post-Construction"];
        cleanTypes.forEach((type) => {
            expect(screen.getByText(type)).toBeInTheDocument();
        });
    });
  
  
    it("handles selection of bedroom, bathroom, and clean type", () => {
        render(<HomeCleaning />);
  
        // Select a bedroom
        fireEvent.click(screen.getByTestId("bed-option-2"));
        expect(screen.getByTestId("bed-option-2")).toHaveClass("border-[#1A78F2] text-[#1A78F2]");

        // Select a bathroom
        fireEvent.click(screen.getByTestId("bathroom-option-3"));
        expect(screen.getByTestId("bathroom-option-3")).toHaveClass("border-[#1A78F2] text-[#1A78F2]");

        // Select a clean type  (This part was already correct)
        fireEvent.click(screen.getByText("Deep Clean"));
        expect(screen.getByText("Deep Clean").closest('div')).toHaveClass("border-[#1A78F2] text-[#1A78F2]");

    });  

    it("handle button next correctly", () => {
        const push = jest.fn();
        (useRouter as jest.Mock).mockReturnValue({ push }); // Set up mock push
    
        render(<HomeCleaning />);
    
        fireEvent.click(screen.getByRole("button", { name: "Next" })); // Use role for button
        expect(push).toHaveBeenCalledWith("/booking/step-2"); // Check navigation
    });

    it("handles service details correctly", () => {
        render(<OtherServices />);
        const service_detail_options = ["BabySitting", "Caretaking", "House Keeping"];
        service_detail_options.forEach((option) => {
            expect(screen.getByText(option)).toBeInTheDocument();
        });
    });

    it("handles for how long selection correctly", () => {
        render(<OtherServices />);
        const forHowLong = ["1-3 hours", "3-5 hours", "Half a Day", "A Day"];
        forHowLong.forEach((option) => {
            expect(screen.getByText(option)).toBeInTheDocument();
        });
    });
});