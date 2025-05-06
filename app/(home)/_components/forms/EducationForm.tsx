import React, { useCallback, useEffect } from "react";
import { useResumeContext } from "@/context/resume-info-provider";
import { Button } from "@/components/ui/button";
import { Loader, Plus, X } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import useUpdateDocument from "@/features/document/use-update-document";
import { generateThumbnail } from "@/lib/helper";
import { toast } from "sonner";

const initialState = {
  id: undefined,
  docId: undefined,
  universityName: "",
  startDate: "",
  endDate: "",
  degree: "",
  major: "",
  description: "",
};

const EducationForm = (props: { handleNext: () => void }) => {
  const { handleNext } = props;
  const { resumeInfo, onUpdate } = useResumeContext();
  const { mutateAsync, isPending } = useUpdateDocument();

  const [educationList, setEducationList] = React.useState(() => {
    return resumeInfo?.educations?.length
      ? resumeInfo.educations
      : [initialState];
  });

  useEffect(() => {
    if (!resumeInfo) return;
    onUpdate({
      ...resumeInfo,
      educations: educationList,
    });
  }, [educationList, resumeInfo, onUpdate]);

  const handleChange = (
    e: { target: { name: string; value: string } },
    index: number
  ) => {
    const { name, value } = e.target;
    setEducationList((prevState) => {
      const newEducationList = [...prevState];
      newEducationList[index] = {
        ...newEducationList[index],
        [name]: value,
      };
      return newEducationList;
    });
  };

  const addNewEducation = () => {
    setEducationList([...educationList, initialState]);
  };

  const removeEducation = (index: number) => {
    const updatedEducation = [...educationList];
    updatedEducation.splice(index, 1);
    setEducationList(updatedEducation);
  };

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      try {
        const thumbnail = await generateThumbnail();
        const currentNo = resumeInfo?.currentPosition
          ? resumeInfo.currentPosition + 1
          : 1;

        await mutateAsync(
          {
            currentPosition: currentNo,
            thumbnail: thumbnail,
            education: educationList,
          },
          {
            onSuccess: () => {
              toast.success("Education updated successfully");
              handleNext();
            },
            onError() {
              toast.error("Failed to update education");
            },
          }
        );
      } catch (err) {
        toast.error("Something went wrong while updating education");
        console.error(err);
      }
    },
    [resumeInfo, educationList, mutateAsync, handleNext]
  );

  return (
    <div>
      <div className="w-full">
        <h2 className="font-bold text-lg">Education</h2>
        <p className="text-sm">Add your education details</p>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="border w-full h-auto divide-y-[1px] rounded-md px-3 pb-4 my-5">
          {educationList?.map((item, index) => (
            <div key={index}>
              <div className="relative grid grid-cols-2 mb-5 pt-4 gap-3">
                {educationList?.length > 1 && (
                  <Button
                    variant="secondary"
                    type="button"
                    disabled={isPending}
                    className="size-[20px] text-center rounded-full absolute -top-3 -right-5 !bg-black dark:!bg-gray-600 text-white"
                    size="icon"
                    onClick={() => removeEducation(index)}
                  >
                    <X size="13px" />
                  </Button>
                )}

                <div className="col-span-2">
                  <Label className="text-sm">University Name</Label>
                  <Input
                    name="universityName"
                    required
                    value={item?.universityName || ""}
                    onChange={(e) => handleChange(e, index)}
                  />
                </div>
                <div>
                  <Label className="text-sm">Degree</Label>
                  <Input
                    name="degree"
                    required
                    value={item?.degree || ""}
                    onChange={(e) => handleChange(e, index)}
                  />
                </div>
                <div>
                  <Label className="text-sm">Major</Label>
                  <Input
                    name="major"
                    required
                    value={item?.major || ""}
                    onChange={(e) => handleChange(e, index)}
                  />
                </div>
                <div>
                  <Label className="text-sm">Start Date</Label>
                  <Input
                    name="startDate"
                    type="date"
                    required
                    value={item?.startDate || ""}
                    onChange={(e) => handleChange(e, index)}
                  />
                </div>
                <div>
                  <Label className="text-sm">End Date</Label>
                  <Input
                    name="endDate"
                    type="date"
                    required
                    value={item?.endDate || ""}
                    onChange={(e) => handleChange(e, index)}
                  />
                </div>
                <div className="col-span-2 mt-1">
                  <Label className="text-sm">Description</Label>
                  <Textarea
                    name="description"
                    required
                    value={item.description || ""}
                    onChange={(e) => handleChange(e, index)}
                  />
                </div>
              </div>

              {index === educationList.length - 1 &&
                educationList.length < 5 && (
                  <Button
                    className="gap-1 mt-1 text-primary border-primary/50"
                    variant="outline"
                    type="button"
                    disabled={isPending}
                    onClick={addNewEducation}
                  >
                    <Plus size="15px" />
                    Add More Education
                  </Button>
                )}
            </div>
          ))}
        </div>
        <Button className="mt-4" type="submit" disabled={isPending}>
          {isPending && <Loader size="15px" className="animate-spin" />}
          Save Changes
        </Button>
      </form>
    </div>
  );
};

export default EducationForm;
