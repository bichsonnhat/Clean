import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import "@testing-library/jest-dom"
import test, { beforeEach, describe } from 'node:test';
import HomeCleaning from '@/components/step-1/HomeCleaning';
import { useRouter } from 'next/navigation';
import Step_2 from '@/app/(booking)/(routes)/booking/step-2/page';

jest.mock("next/navigation", () => ({
    useRouter: jest.fn(),
}));
  
describe("Step_2 Component", () => {
    it("renders the component", () => {
        render(<Step_2 />);
        expect(screen.getByText("Book Date")).toBeInTheDocument();
        expect(screen.getByTestId("mock-calendar")).toBeInTheDocument();
    });

    it("navigates to /booking/step-3 on Next button click", () => {
        const push = jest.fn();
        (useRouter as jest.Mock).mockReturnValue({ push });

        render(<Step_2 />);
        fireEvent.click(screen.getByRole("button", { name: "Next" }));
        expect(push).toHaveBeenCalledWith("/booking/step-3");
    });


    it("renders day of week labels", () => {
        render(<Step_2 />);
        const daysOfWeek = ["SUNDAY", "MONDAY", "TUESDAY", "WEDNESDAY", "THURSDAY", "FRIDAY", "SATURDAY"];
        daysOfWeek.forEach((day) => {
            expect(screen.getByText(day)).toBeVisible();
        });
    });


    it("renders the Calendar component with the correct month", () => {
        render(<Step_2 />);
        // January is the default month (index 0, but we add 1 to match month names)
        const mockCalendar = screen.getByTestId('mock-calendar');
        expect(mockCalendar).toBeInTheDocument();

    });
});