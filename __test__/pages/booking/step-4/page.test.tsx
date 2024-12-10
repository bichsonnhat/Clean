import { render, screen, fireEvent } from "@testing-library/react"; 
import { InputWithLabel } from "@/components/input/inputwithlabel";
import { MultiLineInput } from "@/components/input/multipleline-input";
import { ToggleButton } from "@/components/button/togglebutton";
import { ToggleButtonGroup } from "@/components/button/togglebuttongroup";
import Booking4 from "@/components/booking/step-4/booking4";

// jest.mock('@/components/input/inputwithlabel', () => ({
//     InputWithLabel: jest.fn(() => <input data-testid="mock-input-with-label" />),
// }));
  
// jest.mock('@/components/input/multipleline-input', () => ({
//     MultiLineInput: jest.fn(() => <textarea data-testid="mock-multi-line-input" />),
// }));

// jest.mock('@/components/button/togglebutton', () => ({
//     ToggleButton: jest.fn(({ contentText, price, imageSrc, imageSrc2, className }) => (
//         <button data-testid={`toggle-button-${contentText}`} className={className}>
//           {contentText} {price && <span>{price}</span>}
//           {imageSrc && <img src={imageSrc} alt={contentText} />}
//           {imageSrc2 && <img src={imageSrc2} alt={`${contentText}-selected`} />}
//         </button>
//       )),
// }));

// jest.mock('@/components/button/togglebuttongroup', () => ({
//     ToggleButtonGroup: jest.fn(({ buttons, classNameCommon }) => (
//         <div data-testid="toggle-button-group">
//           {buttons.map((button : any) => (
//             <button key={button.id} data-testid={`toggle-button-group-${button.contentText}`} className={classNameCommon}>
//               {button.contentText}
//             </button>
//           ))}
//         </div>
//       )),
// }));

describe("Booking4 Component", () => {
    // beforeEach(() => {
    //     (InputWithLabel as jest.Mock).mockClear();
    //     (MultiLineInput as jest.Mock).mockClear();
    //     (ToggleButton as jest.Mock).mockClear();
    //     (ToggleButtonGroup as jest.Mock).mockClear();
    // });

    it("renders the component", () => {
        render(<Booking4 />);
        expect(
            screen.getByText("Add Your Address & Details")
        ).toBeInTheDocument();
    });

    it("renders InputWithLabel components correctly", () => {
        render(<Booking4 />);

        expect(InputWithLabel).toHaveBeenCalledWith(
            expect.objectContaining({
                labelText: "ADDRESS",
                inputType: "text",
                inputPlaceholder: "Enter a Location",
                inputId: "location",
            }),
            expect.anything() // This is for React.children, which we don't need to test strictly here
        );

        expect(InputWithLabel).toHaveBeenCalledWith(
            expect.objectContaining({
                labelText: "APT.NUMBER",
                inputType: "text",
                inputPlaceholder: "",
                inputId: "aptNum",
            }),
            expect.anything()
        );

        expect(InputWithLabel).toHaveBeenCalledTimes(2);
    });

    it("renders ToggleButtonGroup for 'HOW DO WE GET IN?'", () => {
        render(<Booking4 />);

        expect(ToggleButtonGroup).toHaveBeenCalledWith(
            expect.objectContaining({
                buttons: expect.arrayContaining([
                    expect.objectContaining({ contentText: "Someone in Home" }),
                    expect.objectContaining({ contentText: "Doorman" }),
                    expect.objectContaining({ contentText: "Hidden Key" }),
                    expect.objectContaining({ contentText: "Others" }),
                ]),
            }),
            expect.anything()
        );
    });

    it("renders ToggleButton components for 'DEEP CLEAN' options", () => {
        render(<Booking4 />);
        expect(ToggleButton).toHaveBeenCalledWith(
            expect.objectContaining({
                contentText: "Inside fridge",
            }),
            expect.anything()
        );

        expect(ToggleButton).toHaveBeenCalledWith(
            expect.objectContaining({
                contentText: "Inside oven",
            }),
            expect.anything()
        );

        expect(ToggleButton).toHaveBeenCalledWith(
            expect.objectContaining({
                contentText: "Inside cabinets",
            }),
            expect.anything()
        );

        expect(ToggleButton).toHaveBeenCalledTimes(3);
    });

    it("renders ToggleButtonGroup for 'ANY PET?'", () => {
        render(<Booking4 />);

        expect(ToggleButtonGroup).toHaveBeenCalledWith(
            expect.objectContaining({
                buttons: expect.arrayContaining([
                    expect.objectContaining({ contentText: "Yes" }),
                    expect.objectContaining({ contentText: "No" }),
                ]),
            }),
            expect.anything()
        );
        expect(ToggleButtonGroup).toHaveBeenCalledTimes(2);
    });

    it("renders MultiLineInput components correctly", () => {
        render(<Booking4 />);
        expect(MultiLineInput).toHaveBeenCalledWith(
            expect.objectContaining({
                hasLabel: false,
                inputPlaceholder: "What types of pets? Some of our cleaners have pet allergies.",
                inputId: "notesPet",
            }),
            expect.anything()
        );

        expect(MultiLineInput).toHaveBeenCalledWith(
            expect.objectContaining({
                hasLabel: true,
                labelText: "ADDITIONAL NOTES",
                inputPlaceholder: "I would like Sophie to be my cleaner. Please change my sheets \n(fresh bedding is on the bed) and empty the dishwasher.",
                inputId: "notes",
            }),
            expect.anything()
        );

        expect(MultiLineInput).toHaveBeenCalledTimes(2);
    });
});