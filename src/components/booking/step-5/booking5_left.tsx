"use client"
import { InputWithLabel } from "@/components/input/inputwithlabel";
import { ScrollArea } from "@/components/ui/scroll-area";
import { CheckboxWithText } from "@/components/checkbox/checkboxwithtext";
import React, { useEffect, useState } from "react";
import { bookingStore } from "@/utils/store/booking.store";

const Booking5Left = () => {
  const bookingUpdate = bookingStore((state: any) => state.updateBookingData);
  const setValidateFields = bookingStore((state: any) => state.setValidateFields);

  // State để lưu giá trị và lỗi
  const [fullName, setFullName] = useState("");
  const [emailAddress, setEmailAddress] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [contactNote, setContactNote] = useState("");
  const [isCheckboxChecked, setIsCheckboxChecked] = useState(false);

  const [errors, setErrors] = useState({
    fullName: "",
    emailAddress: "",
    phoneNumber: "",
    contactNote: "",
  });

  const validateFullName = (value: string) => {
    if (!value.trim()) return "Full name is required.";
    return "";
  };

  const validateEmailAddress = (value: string) => {
    if (!value.trim() || !/\S+@\S+\.\S+/.test(value))
      return "Valid email address is required.";
    return "";
  };

  const validatePhoneNumber = (value: string) => {
    if (!value.trim() || !/^[0-9]{10}$/.test(value))
      return "Valid phone number is required.";
    return "";
  };

  const validateContactNote = (value: string) => {
    if (!value.trim()) return "Contact note is required.";
    return "";
  };

  // Hàm validate
  const validateFields = () => {
    console.log("Validating with values:", fullName, emailAddress, phoneNumber, contactNote);  // Thêm log để kiểm tra giá trị
    const newErrors = {
      fullName: validateFullName(fullName),
      emailAddress: validateEmailAddress(emailAddress),
      phoneNumber: validatePhoneNumber(phoneNumber),
      contactNote: validateContactNote(contactNote),
    };

    console.log("Setting errors:", newErrors);
    setErrors(newErrors);
    return Object.values(newErrors).every((error) => !error);
  };

  useEffect(() => {
    setValidateFields(() => validateFields());

    // Hủy đăng ký khi component unmount
    return () => setValidateFields(null);
  }, []);

  // Hàm handle khi mất focus
  const handleBlur = () => {
    setValidateFields(() => validateFields());
  };

  return (
    <div className="w-full md:w-2/3 p-4 bg-white min-h-screen">
      <div className="justify-center h-max">
        <p className="text-4xl text-center font-Averta-Bold mb-2 mt-[50px] ">
          Payment Details
        </p>
        <p className="text-[20px] text-center text-[#88939D] font-Averta-Semibold leading-[25px]">
          Add in your payment details through our secure gateway
        </p>
      </div>

      <div className="grid justify-center mt-[50px] gap-6">
        <div className="flex">
          <div className="flex flex-wrap md:flex-row justify-center gap-3">
            <InputWithLabel
              className="min-w-[360px]"
              labelText="FULL NAME"
              inputType="text"
              inputPlaceholder="Enter Full Name"
              inputId="name"
              inputWidth="25vw"
              value={fullName}
              error={errors.fullName}
              onChange={(e) => {
                const value = e.target.value;
                setFullName(value);
                setErrors((prev) => ({
                  ...prev,
                  fullName: validateFullName(value),
                }));
                bookingUpdate({ fullName: value });
                // setValidateFields(() => validateFields());
              }}
              onBlur={handleBlur}
            />
            <div className="mt-2 md:mt-0">
              <InputWithLabel
                className="min-w-[360px]"
                labelText="EMAIL ADDRESS"
                inputType="email"
                inputPlaceholder="Enter your email address"
                inputId="email"
                inputWidth="25vw"
                value={emailAddress}
                error={errors.emailAddress}
                onChange={(e) => {
                  const value = e.target.value;
                  setEmailAddress(value);
                  setErrors((prev) => ({
                    ...prev,
                    emailAddress: validateEmailAddress(value),
                  }));
                  bookingUpdate({ emailAddress: value });
                  // setValidateFields(() => validateFields());
                }}
                onBlur={handleBlur}
              />
            </div>
          </div>
        </div>

        <div className="flex">
          <div className="flex flex-wrap md:flex-row justify-center gap-3">
            <InputWithLabel
              className="min-w-[360px]"
              labelText="PHONE NUMBER"
              inputType="text"
              inputPlaceholder="Enter a Phone number"
              inputId="phoneNum"
              inputWidth="25vw"
              value={phoneNumber}
              error={errors.phoneNumber}
              onChange={(e) => {
                const value = e.target.value;
                setPhoneNumber(value);
                setErrors((prev) => ({
                  ...prev,
                  phoneNumber: validatePhoneNumber(value),
                }));
                bookingUpdate({ phoneNumber: value });
                // setValidateFields(() => validateFields());
              }}
              onBlur={handleBlur}
            />
            <InputWithLabel
              className="min-w-[360px]"
              labelText="HOW DO WE CONTACT YOU"
              inputType="text"
              inputPlaceholder=""
              inputId="contactEmail"
              inputWidth="25vw"
              value={contactNote}
              error={errors.contactNote}
              onChange={(e) => {
                const value = e.target.value;
                setContactNote(value);
                setErrors((prev) => ({
                  ...prev,
                  contactNote: validateContactNote(value),
                }));
                bookingUpdate({ contactNote: value });
                // setValidateFields(() => validateFields());
              }}
              onBlur={handleBlur}
            />
          </div>
        </div>

        <div className="mt-[30px] grid justify-center ">
          <ScrollArea
            style={{ width: `calc(50vw + 8px)` }}
            className="h-[200px] min-w-[360px] w-full font-Averta-Regular rounded-md border p-3"
          >
            <span className="font-bold">Payment and Refund Policy</span>
            <br />
            1. Payment Terms
            <br />
            All payments must be made in full at the time of purchase, unless
            otherwise agreed upon.
            <br />
            Accepted payment methods include [insert payment methods: e.g.,
            credit card, debit card, PayPal, bank transfer, etc.].
            <br />
            Any additional taxes, fees, or charges are the responsibility of the
            customer.
            <br />
            2. Refund Policy
            <br />
            Eligibility for Refunds:
            <br />
            Refund requests will only be considered under the following
            conditions:
            <br />
            The product is defective or damaged upon delivery.
            <br />
            The service provided does not match the description or agreement.
            <br />
            Refund Process:
            <br />
            Customers must submit a refund request within [insert time frame,
            e.g., 14 days] of purchase.
            <br />
            Proof of purchase (e.g., receipt, order confirmation) and, if
            applicable, evidence of the issue (e.g., photos, videos) must be
            provided.
            <br />
            Non-Refundable Items:
            <br />
            Certain products or services may not be eligible for a refund,
            including [list non-refundable items or services].
            <br />
            3. Exchanges
            <br />
            Exchanges are allowed for eligible products if requested within
            [insert time frame, e.g., 14 days] of receipt. Products must be
            unused, in original packaging, and accompanied by proof of purchase.
            <br />
            4. Processing Time
            <br />
            Refunds and exchanges will be processed within [insert time frame,
            e.g., 7–14 business days] after approval of the request.
            <br />
            5. Contact Information
            <br />
            For any inquiries regarding payments or refunds, please contact us
            at [insert contact information, e.g., email or phone number].
            <br />
            Note: This policy is subject to change without prior notice. Please
            review our terms and conditions regularly.
            <br />
          </ScrollArea>
          <CheckboxWithText
          />
        </div>
      </div>
    </div>
  );
};

export default Booking5Left;
