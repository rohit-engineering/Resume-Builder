import { useState } from "react";
import {
  Globe,
  ChevronDown,
  ChevronUp,
  Plus,
  Trash2,
  Link2,
} from "lucide-react";

import SectionWrapper from "./SectionWrapper";

const platforms = [
  "LinkedIn",
  "GitHub",
  "Portfolio",
  "LeetCode",
  "HackerRank",
  "Behance",
  "Dribbble",
  "Medium",
  "Twitter/X",
  "Other",
];

function SocialLinksCard({
  resumeData,
  setResumeData,
}) {
  const socialLinks =
    resumeData.socialLinks || [];

  const [sectionExpanded, setSectionExpanded] =
    useState(true);

  const toggleCard = () => {
    setSectionExpanded(
      (prev) => !prev
    );
  };

  const addLink = () => {
    setSectionExpanded(true);

    setResumeData((prev) => ({
      ...prev,

      socialLinks: [
        ...prev.socialLinks,

        {
          id:
            crypto.randomUUID(),

          title: "LinkedIn",

          url: "",

          expanded: true,
        },
      ],
    }));
  };

  const updateLink = (
    id,
    field,
    value
  ) => {
    setResumeData((prev) => ({
      ...prev,

      socialLinks:
        prev.socialLinks.map(
          (link) =>
            link.id === id
              ? {
                  ...link,
                  [field]:
                    value,
                }
              : link
        ),
    }));
  };

  const deleteLink = (
    id
  ) => {
    setResumeData((prev) => ({
      ...prev,

      socialLinks:
        prev.socialLinks.filter(
          (link) =>
            link.id !== id
        ),
    }));
  };

  const toggleLink =
    (id) => {
      setResumeData((prev) => ({
        ...prev,

        socialLinks:
          prev.socialLinks.map(
            (link) =>
              link.id === id
                ? {
                    ...link,

                    expanded:
                      !link.expanded,
                  }
                : link
          ),
      }));
    };

  const deleteSection = () => {
    setResumeData((prev) => ({
      ...prev,
      socialLinks: [],
    }));
  };

  return (
    <SectionWrapper
      icon={<Globe size={20} />}
      title="Websites & Profiles"
      subtitle="Showcase your portfolio and professional online presence."
      expanded={
        sectionExpanded
      }
      onToggle={toggleCard}
      onDelete={deleteSection}
    >
      <div className="space-y-4 pt-6">
        {socialLinks.map(
          (link) => (
            <div
              key={link.id}
              className="
                bg-white
                border
                border-slate-200
                rounded-2xl

                hover:border-slate-300
                hover:shadow-sm

                transition-all
              "
            >
              <button
                type="button"
                onClick={() =>
                  toggleLink(
                    link.id
                  )
                }
                className="
                  w-full
                  px-5
                  py-4

                  flex
                  items-center
                  justify-between

                  hover:bg-slate-50
                "
              >
                <div className="text-left">
                  <h4
                    className="
                      text-base
                      font-semibold
                      text-slate-900
                    "
                  >
                    {link.title ||
                      "Social Link"}
                  </h4>

                  <p
                    className="
                      mt-1
                      text-sm
                      text-slate-500
                      truncate
                      max-w-87.5
                    "
                  >
                    {link.url ||
                      "No URL added"}
                  </p>
                </div>

                <div
                  className="
                    flex
                    items-center
                    gap-2
                  "
                >
                  <button
                    type="button"
                    onClick={(
                      e
                    ) => {
                      e.stopPropagation();

                      deleteLink(
                        link.id
                      );
                    }}
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

                  <div
                    className="
                      p-2
                      rounded-lg
                      bg-slate-100
                      text-slate-400
                    "
                  >
                    {link.expanded ? (
                      <ChevronUp
                        size={18}
                      />
                    ) : (
                      <ChevronDown
                        size={18}
                      />
                    )}
                  </div>
                </div>
              </button>

              {link.expanded && (
                <div
                  className="
                    border-t
                    border-slate-200

                    p-5
                    space-y-5
                  "
                >
                  <div>
                    <label
                      className="
                        block
                        mb-2

                        text-sm
                        font-medium
                        text-slate-700
                      "
                    >
                      Platform
                    </label>

                    <select
                      value={
                        link.title
                      }
                      onChange={(
                        e
                      ) =>
                        updateLink(
                          link.id,
                          "title",
                          e.target.value
                        )
                      }
                      className="
                        w-full
                        h-11

                        rounded-xl
                        border
                        border-slate-300

                        px-4

                        focus:outline-none
                        focus:ring-4
                        focus:ring-cyan-100
                        focus:border-cyan-500
                      "
                    >
                      {platforms.map(
                        (
                          platform
                        ) => (
                          <option
                            key={
                              platform
                            }
                          >
                            {
                              platform
                            }
                          </option>
                        )
                      )}
                    </select>
                  </div>

                  <div>
                    <label
                      className="
                        block
                        mb-2

                        text-sm
                        font-medium
                        text-slate-700
                      "
                    >
                      Profile URL
                    </label>

                    <div className="relative">
                      <Link2
                        size={16}
                        className="
                          absolute
                          left-4
                          top-1/2
                          -translate-y-1/2

                          text-slate-400
                        "
                      />

                      <input
                        value={
                          link.url
                        }
                        onChange={(
                          e
                        ) =>
                          updateLink(
                            link.id,
                            "url",
                            e.target.value
                          )
                        }
                        placeholder="https://..."
                        className="
                          w-full
                          h-11

                          rounded-xl
                          border
                          border-slate-300

                          pl-11
                          pr-4

                          focus:outline-none
                          focus:ring-4
                          focus:ring-cyan-100
                          focus:border-cyan-500
                        "
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>
          )
        )}

        <button
          type="button"
          onClick={addLink}
          className="
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
          Add Profile
        </button>
      </div>
    </SectionWrapper>
  );
}

export default SocialLinksCard;