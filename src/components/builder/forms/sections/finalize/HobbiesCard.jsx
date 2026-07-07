import { useState } from "react";
import {
  Heart,
  Plus,
  Trash2,
} from "lucide-react";

import SectionWrapper from "./SectionWrapper";

function HobbiesCard({
  resumeData,
  setResumeData,
}) {
  const hobbies =
    resumeData.hobbies || [];

  const [sectionExpanded, setSectionExpanded] =
    useState(true);

  const toggleCard = () => {
    setSectionExpanded(
      (prev) => !prev
    );
  };

  const addHobby = () => {
    setSectionExpanded(true);

    setResumeData((prev) => ({
      ...prev,

      hobbies: [
        ...prev.hobbies,
        {
          id:
            crypto.randomUUID(),
          name: "",
          expanded: true,
        },
      ],
    }));
  };

  const updateHobby = (
    id,
    value
  ) => {
    setResumeData((prev) => ({
      ...prev,

      hobbies: prev.hobbies.map(
        (hobby) =>
          hobby.id === id
            ? {
                ...hobby,
                name: value,
              }
            : hobby
      ),
    }));
  };

  const deleteHobby = (
    id
  ) => {
    setResumeData((prev) => ({
      ...prev,

      hobbies:
        prev.hobbies.filter(
          (hobby) =>
            hobby.id !== id
        ),
    }));
  };

  const deleteSection = () => {
    setResumeData((prev) => ({
      ...prev,
      hobbies: [],
    }));
  };

  return (
    <SectionWrapper
      icon={<Heart size={20} />}
      title="Hobbies & Interests"
      subtitle="Optional activities that showcase your personality and interests."
      expanded={
        sectionExpanded
      }
      onToggle={toggleCard}
      onDelete={deleteSection}
    >
      <div className="pt-6">

        <div className="space-y-3">
          {hobbies.map(
            (hobby) => (
              <div
                key={hobby.id}
                className="
                  flex
                  items-center
                  gap-3
                "
              >
                <input
                  value={
                    hobby.name
                  }
                  onChange={(e) =>
                    updateHobby(
                      hobby.id,
                      e.target.value
                    )
                  }
                  placeholder="Photography"
                  className="
                    flex-1
                    h-11
                    rounded-xl
                    border
                    border-slate-300
                    px-4

                    focus:outline-none
                    focus:ring-4
                    focus:ring-pink-100
                    focus:border-pink-500
                  "
                />

                <button
                  type="button"
                  onClick={() =>
                    deleteHobby(
                      hobby.id
                    )
                  }
                  className="
                    p-2
                    rounded-lg
                    text-slate-400
                    hover:bg-red-50
                    hover:text-red-500
                    transition-all
                  "
                >
                  <Trash2
                    size={18}
                  />
                </button>
              </div>
            )
          )}
        </div>

        {hobbies.some(
          (hobby) =>
            hobby.name.trim()
        ) && (
          <div className="mt-6">
            <p
              className="
                text-sm
                font-medium
                text-slate-700
                mb-3
              "
            >
              Preview
            </p>

            <div
              className="
                flex
                flex-wrap
                gap-2
              "
            >
              {hobbies
                .filter(
                  (hobby) =>
                    hobby.name.trim()
                )
                .map((hobby) => (
                  <span
                    key={hobby.id}
                    className="
                      px-3
                      py-1.5
                      rounded-full
                      bg-pink-50
                      text-pink-700
                      text-sm
                      font-medium
                    "
                  >
                    {hobby.name}
                  </span>
                ))}
            </div>
          </div>
        )}

        <button
          type="button"
          onClick={addHobby}
          className="
            mt-6
            inline-flex
            items-center
            gap-2
            px-4
            py-2.5
            rounded-xl
            border
            border-slate-300
            bg-white

            text-slate-700
            font-medium

            hover:bg-slate-50
            hover:border-slate-400

            transition-all
          "
        >
          <Plus size={18} />
          Add Hobby
        </button>

      </div>
    </SectionWrapper>
  );
}

export default HobbiesCard;