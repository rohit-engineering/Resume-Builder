import FormInput from "./FormInput";
import PhoneInput from "./PhoneInput";
import AdditionalInfo from "./AdditionalInfo";

function PersonalInfo({
  resumeData,
  setResumeData,
}) {
  const personal = resumeData.personal;

  const updateField = (
    field,
    value
  ) => {
    setResumeData((prev) => ({
      ...prev,
      personal: {
        ...prev.personal,
        [field]: value,
      },
    }));
  };

  return (
    <div className="max-w-3xl mx-auto">

      {/* Badge */}
      <div
        className="
          inline-flex
          items-center
          px-3
          py-1
          rounded-full
          bg-blue-50
          text-blue-700
          text-sm
          font-medium
          mb-4
        "
      >
        Personal Information
      </div>

      {/* Header */}
      <h2
        className="
          text-3xl
          font-semibold
          text-slate-900
          tracking-tight
        "
      >
        Contact Information
      </h2>

      <p
        className="
          mt-3
          text-slate-500
          text-base
          leading-relaxed
          max-w-2xl
        "
      >
        Add your contact details so employers and recruiters
        can easily reach you regarding opportunities.
      </p>

      {/* Form Card */}
      <div
        className="
          mt-8
          bg-white
          border
          border-slate-200
          rounded-2xl
          shadow-sm
          p-6
          md:p-8
        "
      >
        <div
          className="
            grid
            grid-cols-1
            md:grid-cols-2
            gap-5
          "
        >
          <FormInput
            label="First Name"
            value={personal.firstName}
            onChange={(e) =>
              updateField(
                "firstName",
                e.target.value
              )
            }
          />

          <FormInput
            label="Last Name"
            value={personal.lastName}
            onChange={(e) =>
              updateField(
                "lastName",
                e.target.value
              )
            }
          />

          <FormInput
            label="Desired Job Title"
            fullWidth
            value={personal.jobTitle}
            onChange={(e) =>
              updateField(
                "jobTitle",
                e.target.value
              )
            }
          />

          <PhoneInput
            value={personal.phone}
            onChange={(e) =>
              updateField(
                "phone",
                e.target.value
              )
            }
          />

          <FormInput
            label="Email Address"
            value={personal.email}
            onChange={(e) =>
              updateField(
                "email",
                e.target.value
              )
            }
          />
        </div>
      </div>

      {/* Additional Information */}
      <div className="mt-8">
        <AdditionalInfo
          personal={personal}
          updateField={updateField}
        />
      </div>
    </div>
  );
}

export default PersonalInfo;