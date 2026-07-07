import { useState } from "react";
import {
  ChevronDown,
  MapPin,
  Globe,
} from "lucide-react";

import FormInput from "./FormInput";

function AdditionalInfo({
  personal,
  updateField,
}) {
  const [open, setOpen] =
    useState(false);

  return (
    <div className="mt-10">

      <div
        className="
          bg-white
          border
          border-slate-200
          rounded-2xl

          overflow-hidden

          transition-all
          duration-300
        "
      >
        {/* Header */}

        <button
          type="button"
          onClick={() =>
            setOpen(!open)
          }
          className="
            w-full

            px-5
            py-4

            flex
            items-center
            justify-between

            hover:bg-slate-50

            transition-colors
          "
        >
          <div className="text-left">

            <div
              className="
                flex
                items-center
                gap-3
              "
            >
              <div
                className="
                  w-10
                  h-10

                  rounded-xl

                  bg-cyan-50
                  text-cyan-600

                  flex
                  items-center
                  justify-center
                "
              >
                <MapPin size={18} />
              </div>

              <div>
                <h3
                  className="
                    text-base
                    font-semibold
                    text-slate-900
                  "
                >
                  Additional Information
                </h3>

                <p
                  className="
                    text-sm
                    text-slate-500
                  "
                >
                  Optional details for
                  recruiters and ATS.
                </p>
              </div>
            </div>

          </div>

          <div
            className={`
              p-2
              rounded-lg

              bg-slate-100
              text-slate-500

              transition-transform
              duration-300

              ${
                open
                  ? "rotate-180"
                  : ""
              }
            `}
          >
            <ChevronDown
              size={18}
            />
          </div>
        </button>

        {/* Body */}

        <div
          className={`
            overflow-hidden
            transition-all
            duration-300

            ${
              open
                ? "max-h-[1200px]"
                : "max-h-0"
            }
          `}
        >
          <div
            className="
              border-t
              border-slate-200

              p-5
            "
          >
            <div
              className="
                grid
                grid-cols-2
                gap-5
              "
            >
              <FormInput
                label="Address"
                value={
                  personal.address
                }
                onChange={(e) =>
                  updateField(
                    "address",
                    e.target.value
                  )
                }
                placeholder="Street address"
              />

              <FormInput
                label="City"
                value={
                  personal.city
                }
                onChange={(e) =>
                  updateField(
                    "city",
                    e.target.value
                  )
                }
                placeholder="New Delhi"
              />

              <FormInput
                label="Country"
                value={
                  personal.country
                }
                onChange={(e) =>
                  updateField(
                    "country",
                    e.target.value
                  )
                }
                placeholder="India"
              />

              <FormInput
                label="Postal Code"
                value={
                  personal.pincode
                }
                onChange={(e) =>
                  updateField(
                    "pincode",
                    e.target.value
                  )
                }
                placeholder="110001"
              />

              <FormInput
                label="LinkedIn"
                value={
                  personal.linkedin ||
                  ""
                }
                onChange={(e) =>
                  updateField(
                    "linkedin",
                    e.target.value
                  )
                }
                placeholder="https://linkedin.com/in/username"
                fullWidth
                icon={
                  <Globe
                    size={16}
                  />
                }
              />

              <FormInput
                label="Portfolio / Website"
                value={
                  personal.website ||
                  ""
                }
                onChange={(e) =>
                  updateField(
                    "website",
                    e.target.value
                  )
                }
                placeholder="https://yourportfolio.com"
                fullWidth
                icon={
                  <Globe
                    size={16}
                  />
                }
              />
            </div>
          </div>
        </div>

      </div>

    </div>
  );
}

export default AdditionalInfo;