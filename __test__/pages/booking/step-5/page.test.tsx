import { InputWithLabel } from "@/components/input/inputwithlabel";
import { CheckboxWithText } from "@/components/checkbox/checkboxwithtext";
import Step_5 from "@/app/(booking)/(routes)/booking/step-5/page";
import { render, screen, fireEvent } from '@testing-library/react';
import { useRouter } from "next/navigation";

jest.mock('@/components/input/inputwithlabel', () => ({
    InputWithLabel: jest.fn(() => <input data-testid="mock-input-with-label" />),
}));

jest.mock('@/components/checkbox/checkboxwithtext', () => ({
    CheckboxWithText: jest.fn(() => <input data-testid="mock-checkbox-with-text" />),
}));

jest.mock("next/navigation", () => ({
    useRouter: jest.fn(),
}));

describe("Booking5 Component", () => {
    it("renders the component", () => {
        render(<Step_5 />);
        expect(
            screen.getByText("Payment Details")
        ).toBeInTheDocument();
        expect(
            screen.getByText("Billing")
        ).toBeInTheDocument();
    });

    it("renders InputWithLabel components correctly", () => {
        render(<Step_5 />);

        expect(InputWithLabel).toHaveBeenCalledWith(
            expect.objectContaining({
                labelText: "FULL NAME",
                inputType: "text",
                inputPlaceholder: "Enter Full Name",
            }),
            expect.anything()
        );

        expect(InputWithLabel).toHaveBeenCalledWith(
            expect.objectContaining({
                labelText: "EMAIL ADDRESS",
                inputType: "email",
                inputPlaceholder: "Enter your email address",
            }),
            expect.anything()
        );

        expect(InputWithLabel).toHaveBeenCalledWith(
            expect.objectContaining({
                labelText: "PHONE NUMBER",
                inputType: "text",
                inputPlaceholder: "Enter a Phone number",
            }),
            expect.anything()
        );

        expect(InputWithLabel).toHaveBeenCalledWith(
            expect.objectContaining({
                labelText: "HOW DO WE CONTACT YOU",
                inputType: "email",
                inputPlaceholder: "Enter a Contact method"
            }),
            expect.anything()
        );
    });

    it("renders CheckboxWithText components correctly", () => {
        render(<Step_5 />);

        expect(CheckboxWithText).toHaveBeenCalled;
    });

    it("handle button next correctly", () => {
        const push = jest.fn();
        (useRouter as jest.Mock).mockReturnValue({ push }); // Set up mock push
    
        render(<Step_5 />);
    
        fireEvent.click(screen.getByRole("button", { name: "Place order" })); // Use role for button
        expect(push).toHaveBeenCalledWith("/payment-success"); // Check navigation
    });
});

