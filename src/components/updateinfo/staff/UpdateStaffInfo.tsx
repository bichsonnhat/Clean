"use client"
import { InputWithLabel } from '@/components/input/inputwithlabel'
import Image from "next/image";
import React, { useRef } from 'react';
import { Button } from '@/components/ui/button';
import { MultipleChoiceInput } from '@/components/input/multiplechoice-input';
import { ComboboxInput } from '@/components/input/combobox-input';
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { createHelperInfoData, helperInfoSchema } from '@/schema/helperInfoSchema';
import { setId } from '@material-tailwind/react/components/Tabs/TabsContext';
import FileDownloadCard from '@/components/card/FileDownloadCard';

const genderOptions = ["Female", "Male", "Other"]


const UpdateStaffInfo = () => {
  const [serviceCategory, setServiceCategory] = useState<ServiceCategory[]>([]);

  const form = useForm<createHelperInfoData>({
    mode: "onSubmit",
    resolver: zodResolver(helperInfoSchema),
  });

  const fetchServiceCategory = async () => {
    try {
      const response = await fetch('/api/service-categories');
      if (!response.ok) {
        throw new Error("Error fetching service types");
      }
      const data = await response.json();
      setServiceCategory(data);
    } catch (error) {
      console.error("Error fetching service types:", error);
    }
  };

  useEffect(() => {
    fetchServiceCategory();
  }, []);

  const options = serviceCategory.map(serviceCategory => ({
    id: serviceCategory.id,
    name: serviceCategory.name,
  }));

  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
  const [selectedAvatar, setSelectedAvatar] = useState<File | null>(null);
  const [idCard, setIdCard] = useState<File | null>(null);
  const [idCardUrl, setidCardUrl] = useState<string | null>(null);
  const [resume, setResume] = useState<File | null>(null);
  const [resumeUrl, setResumeUrl] = useState<string | null>(null);

  const inputAvatarRef = useRef<HTMLInputElement>(null);

  // Handle file selection
  const handleAvatarChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedAvatar(file);

      const objectUrl = URL.createObjectURL(file);
      setAvatarUrl(objectUrl);
    }
  };

  const handleIdCardChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) {
      const allowedFormats = ["image/jpeg", "image/png", "application/pdf"];
      if (!allowedFormats.includes(selectedFile.type)) {
        alert("Only JPG, PNG, or PDF files are allowed!");
        return;
      }

      if (selectedFile.size > 10 * 1024 * 1024) {
        alert("File size should be less than 10MB!");
        return;
      }

      setIdCard(selectedFile);

      if (selectedFile.type.startsWith("image/")) {
        const objectUrl = URL.createObjectURL(selectedFile);
        setidCardUrl(objectUrl);
      }
      else {
        setidCardUrl(null);
      }
    }
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const droppedFile = event.dataTransfer.files?.[0];
    if (droppedFile) {
      const allowedFormats = ["image/jpeg", "image/png", "application/pdf"];
      if (!allowedFormats.includes(droppedFile.type)) {
        alert("Only JPG, PNG, or PDF files are allowed!");
        return;
      }

      if (droppedFile.size > 10 * 1024 * 1024) {
        alert("File size should be less than 10MB!");
        return;
      }

      setIdCard(droppedFile);

      if (droppedFile.type.startsWith("image/")) {
        const objectUrl = URL.createObjectURL(droppedFile);
        setidCardUrl(objectUrl);
      }
      else {
        setidCardUrl(null);
      }
    }
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  const handleDownload = (file: File | null) => {
    if (!file) {
      alert("No file selected to download.");
      return;
    }
  
    const fileUrl = URL.createObjectURL(file);
  
    const link = document.createElement('a');
    link.href = fileUrl;
    link.download = file.name; 
  
    document.body.appendChild(link);
    link.click();
  
    document.body.removeChild(link);
    URL.revokeObjectURL(fileUrl);
  };


  // const handleSubmitImage = async () => {
  //   if (!selectedAvatar) {
  //     alert("Please select an image first!");
  //     return;
  //   }

  //   const formData = new FormData();
  //   formData.append("file", selectedAvatar);

  //   try {
  //     const response = await fetch("/api/test-cloudinary", {
  //       method: "POST",
  //       body: formData,
  //     });

  //     const data = await response.json();

  //     if (response.ok) {
  //       alert("Upload successful!");
  //       console.log("Uploaded Data:", data);
  //     } else {
  //       alert("Upload failed!");
  //     }
  //   } catch (error) {
  //     console.error("Upload failed:", error);
  //     alert("Something went wrong.");
  //   }
  // };


  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = form;

  const onSubmitHandle = async (data: createHelperInfoData) => {
    console.log(data);
  };

  return (
    <form
      className="flex flex-col md:flex-row h-full relative min-h-screen"
      onSubmit={handleSubmit(onSubmitHandle)}>
      {/* Section-Left */}
      <div className="md:w-2/3 pb-10 bg-white min-h-screen">
        <Image
          src="/images/x-button.png"
          alt="X-button"
          width={70}
          height={70}
        />
        <div className="justify-center h-max">
          <p className="text-4xl text-center font-Averta-Bold mb-2  mx-auto md:w-[41.53vw]">
            Update Your Info to Continue
          </p>
          <p className="text-[20px] text-center text-[#88939D] font-Averta-Semibold mx-auto leading-[25px] md:w-[41.53vw]">
            With your latest details, we can serve you better and ensure
            everything runs smoothly
          </p>
        </div>
        <div className="grid mt-[80px] gap-7">
          <div className="flex justify-center flex-wrap md:flex-row gap-2 w-full">

            <Controller
              name="fullName"
              control={control}
              render={({ field }) => (
                <InputWithLabel
                  className="min-w-[290px]"
                  labelText="FULL NAME" inputType="text"
                  inputPlaceholder="Enter Full Name" inputId="fullName"
                  value={field.value ?? ""}
                  onChange={field.onChange}
                  inputWidth="25vw"
                  error={errors.fullName?.message}
                />
              )} />
            <div className="flex md:mt-0 gap-2">
              <Controller
                name="dateOfBirth"
                control={control}
                render={({ field }) => (
                  <InputWithLabel
                    className="min-w-[170px]"
                    labelText="DATE OF BIRTH" inputType="date"
                    inputPlaceholder="" inputId="dateOfBirth"
                    value={field.value}
                    onChange={field.onChange}
                    error={errors.dateOfBirth?.message}
                    inputWidth="11.25vw" />
                )} />
              <Controller
                name="gender"
                control={control}
                render={({ field }) => (
                  <ComboboxInput
                    className="min-w-[112px]"
                    labelText="GENDER"
                    inputId="gender" defaultValue={genderOptions.at(0)}
                    inputWidth="6.875vw" options={genderOptions}
                    inputPlaceholder='Gender'
                    value={field.value ?? ""}
                    onChange={field.onChange}
                    error={errors.gender?.message}
                  />
                )} />

            </div>
          </div>

          <div className="flex justify-center flex-wrap md:flex-row gap-2">
            <Controller
              name="phoneNumber"
              control={control}
              render={({ field }) => (
                <InputWithLabel
                  className="min-w-[290px]"
                  labelText="PHONE NUMBER" inputType="text"
                  inputPlaceholder="Enter a Phone number" inputId="phoneNumber"
                  inputWidth="25vw"
                  value={field.value ?? ""}
                  onChange={field.onChange}
                  error={errors.phoneNumber?.message} />
              )} />

            <div className="md:mt-0">
              <Controller
                name="email"
                control={control}
                render={({ field }) => (
                  <InputWithLabel
                    className="min-w-[290px]"
                    labelText="EMAIL ADDRESS" inputType="email"
                    inputPlaceholder="Enter your email address" inputId="contactEmail"
                    inputWidth="18.125vw" plusPX='8px'
                    value={field.value ?? ""}
                    onChange={field.onChange}
                    error={errors.email?.message} />
                )} />
            </div>
          </div>

          <div className="flex justify-center flex-wrap md:flex-row gap-2">
            <Controller
              name="salaryExpectation"
              control={control}
              render={({ field }) => (
                <InputWithLabel
                  className="min-w-[290px] appearance-none"
                  labelText="SALARY EXPECTATION ($)" inputType="number"
                  inputPlaceholder="100000$" inputId="salaryExpectation"
                  inputWidth="18.125vw" plusPX='8px'
                  value={field.value ?? ""}
                  onChange={field.onChange}
                  error={errors.salaryExpectation?.message} />
              )} />

            <div className=" md:mt-0">
              <Controller
                name="city"
                control={control}
                render={({ field }) => (
                  <InputWithLabel
                    className="min-w-[290px]"
                    labelText="CITY/PROVINCE" inputType="text"
                    inputPlaceholder="Enter your city/province" inputId="city"
                    inputWidth="25vw"
                    value={field.value ?? ""}
                    onChange={field.onChange}
                    error={errors.city?.message} />
                )} />
            </div>
          </div>

          <div className="flex justify-center flex-wrap md:flex-row gap-2">
            <Controller
              name="ward"
              control={control}
              render={({ field }) => (
                <InputWithLabel
                  className="min-w-[290px]"
                  labelText="WARD" inputType="text"
                  inputPlaceholder="Enter ward" inputId="ward"
                  inputWidth="25vw"
                  value={field.value ?? ""}
                  onChange={field.onChange}
                  error={errors.ward?.message} />
              )} />

            <div className=" md:mt-0">
              <Controller
                name="postalCode"
                control={control}
                render={({ field }) => (
                  <InputWithLabel
                    className="min-w-[290px]"
                    labelText="POSTAL CODE" inputType="text"
                    inputPlaceholder="Enter Postal Code" inputId="postalCode"
                    inputWidth="18.125vw" plusPX='8px'
                    value={field.value ?? ""}
                    onChange={field.onChange}
                    error={errors.postalCode?.message} />
                )} />
            </div>
          </div>

          <div className="flex justify-center flex-wrap md:flex-row gap-2">
            <Controller
              name="houseNumber"
              control={control}
              render={({ field }) => (
                <InputWithLabel
                  className="min-w-[290px]"
                  labelText="HOUSE NUMBER" inputType="text"
                  inputPlaceholder="Enter your House Number" inputId="houseNumber"
                  inputWidth="18.75vw"
                  value={field.value ?? ""}
                  onChange={field.onChange}
                  error={errors.houseNumber?.message} />
              )} />

            <div className=" md:mt-0">
              <Controller
                name="streetName"
                control={control}
                render={({ field }) => (
                  <InputWithLabel
                    className="min-w-[290px]"
                    labelText="STREET NAME" inputType="text"
                    inputPlaceholder="Enter your Street Name" inputId="streetName"
                    inputWidth="24.375vw" plusPX='8px'
                    value={field.value ?? ""}
                    onChange={field.onChange}
                    error={errors.streetName?.message} />
                )} />

            </div>
          </div>

          <div className="flex justify-center flex-wrap md:flex-row gap-2">
            <Controller
              name="servicesOffered"
              control={control}
              render={({ field }) => (
                <MultipleChoiceInput
                  className="min-w-[290px]"
                  labelText="OFFERED SERVICES" inputId="servicesOffered"
                  inputWidth="43.125vw" plusPX='16px' options={options}
                  value={field.value ?? []}
                  onChange={field.onChange}
                  error={errors.servicesOffered?.message} />
              )} />
          </div>

        </div>
      </div>
      {/* Section-Right */}
      <div className="md:w-1/3 bg-gray-100 min-h-screen">
        {/* Avatar */}
        <div>
          <p className="text-3xl font-Averta-Bold mb-4 mt-[4.7vw] ml-[2.2vw]">Avatar</p>

          <div className="mb-6">
            <div className="w-[160px] h-[160px] rounded-full overflow-hidden flex mx-auto justify-center bg-gray-200 cursor-pointer">
              {avatarUrl ? (
                <Image
                  src={avatarUrl}
                  alt="avatar"
                  width={160}
                  height={160}
                  className="cursor-pointer flex items-center justify-center mx-auto rounded-full"
                  onClick={() => {
                    if (inputAvatarRef.current) {
                      inputAvatarRef.current.click();
                    }
                  }}
                />
              ) : (
                <Image
                  src="/images/Dashboard/Personal/camera.svg"
                  alt="camera"
                  width={160}
                  height={160}
                  className="cursor-pointer flex items-center justify-center mx-auto transition-transform duration-300 hover:scale-110"
                  onClick={() => {
                    if (inputAvatarRef.current) {
                      inputAvatarRef.current.click();
                    }
                  }}
                />
              )}
            </div>

            <input
              ref={inputAvatarRef}
              type="file"
              accept="image/*"
              className="hidden"
              id="avatar-upload"
              onChange={handleAvatarChange}
            />
            <label
              htmlFor="avatar-upload"
              className="block hover:underline w-fit mx-auto mt-2 text-[#1A78F2] cursor-pointer font-Averta-Semibold"
            >
              Upload Your Avatar
            </label>
          </div>
        </div>
        {/* ID Card */}
        <div>
          <p className="text-3xl font-Averta-Bold mb-4 ml-[2.2vw] mt-[1vw]">ID Card</p>
          <input
            id="indentifyCard"
            type="file"
            className="hidden"
            accept=".jpg,.jpeg,.png,.pdf"
            onChange={handleIdCardChange}
          />
          {idCardUrl ? (
            <>
              <div className="text-center">
                <Image
                  src={idCardUrl}
                  alt="identity"
                  width={400}
                  height={200}
                  className='mx-auto'
                />
              </div>
              <div className="flex flex-wrap justify-center gap-[10px] mt-4">
                <Button className="w-[170px] h-[40px] 
                    bg-[#1A78F2] font-Averta-Semibold text-[16px]"
                    type="button"
                    onClick={() => handleDownload(idCard)}>
                    Download
                </Button>
                <Button className="w-[170px] h-[40px]
                    bg-white font-Averta-Semibold text-[#1A78F2] hover:bg-gray-100
                      text-[16px] border-2 border-[#1A78F2]"
                      onClick={() => document.querySelector<HTMLInputElement>("#indentifyCard")?.click()}
                      type="button">Upload IDCard</Button>
              </div></>
          ) : idCard ? (
            <FileDownloadCard 
              className='mx-[2.08vw]' 
              fileName={idCard.name} 
              fileSize={idCard.size}
              onUpdate={() => document.querySelector<HTMLInputElement>("#indentifyCard")?.click()}
              onDownload={() => handleDownload(idCard)} />
          ) : (
            <div
              className="border-2 bg-white mx-[2.08vw] border-dashed border-gray-300 rounded-lg px-4 py-8 text-center"
              onDrop={handleDrop}
              onDragOver={handleDragOver}
            >
              <Image
                src="/images/Dashboard/Personal/upload.svg"
                alt="upload"
                width={40}
                height={40}
                className="mb-6 mx-auto"
              />
              <>
                <p className="text-[14px] text-gray-600 font-Averta-Semibold mb-3">
                  Select a file or drag and drop here
                </p>
                <p className="text-[12px] text-gray-500 mb-6">
                  JPG, PNG or PDF, file size no more than 10MB
                </p>
              </>
              <button
                type="button"
                className="bg-white font-Averta-Semibold text-[#1A78F2] border-2 border-[#1A78F2] px-4 py-2 rounded-md hover:bg-blue-50 transition-colors"
                onClick={() => document.querySelector<HTMLInputElement>("#indentifyCard")?.click()}
              >
                Select File
              </button>
            </div>
          )}

        </div>
        {/* Resume */}
        <div>
          <p className="text-3xl font-Averta-Bold mb-4 ml-[2.2vw] mt-[1vw]">Résumé</p>
          <input
            id="resumeUploaded"
            type="file"
            className="hidden"
            accept=".jpg,.jpeg,.png,.pdf"
            onChange={handleIdCardChange}
          />
          <div className="border-2 bg-white h-auto mx-[2.08vw] border-dashed border-gray-300 rounded-lg px-4 py-4 flex">
            <Image
              src="/images/Dashboard/Personal/upload.svg"
              alt="upload"
              width={40}
              height={40}
            />
            <div className="py-2 px-4 text-center mx-auto">
              <p className="text-[14px] text-gray-600 font-Averta-Semibold">Select your CV or drag and drop here</p>
              <p className="text-[12px] text-gray-500 mt-[12px]">JPG, PNG or PDF, file size no more than 10MB</p>
            </div>
            <button
              type="button"
              className="bg-white font-Averta-Semibold text-[#1A78F2] 
                  border-2 border-[#1A78F2] px-4 py-2 rounded-md hover:bg-blue-50 
                  transition-colors h-fit ml-auto my-auto w-auto">
              Select File
            </button>
          </div>
        </div>

        <div className="flex justify-center items-center mt-[2vw] pb-[2vw]">
          <Button type="submit" className="md:w-1/3 min-w-[150px] h-[60px] bg-[#1A78F2] font-Averta-Semibold text-[16px]">Verify</Button>
        </div>
      </div>
    </form>

  )
}

export default UpdateStaffInfo
