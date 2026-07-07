import { create } from "zustand";
import { persist } from "zustand/middleware";

import { createDefaultResumeData } from "../../constants/defaultResumeData";

import {
  DEFAULT_SECTION_LABELS,
  DEFAULT_SECTION_ORDER,
} from "../sectionDisplay";

export const useResumeStore = create(
  persist(
    (set) => ({
      /*
       * ==========================================
       * Builder State
       * ==========================================
       */

      resumeData: createDefaultResumeData(),
      activeSection: "personal",

      selectedTemplateId: null,
      originTemplateId: null,
      isTemplateLocked: false,

      /*
       * ==========================================
       * Design State
       * ==========================================
       *
       * Always-available global style overrides
       * (font, size, spacing, heading color). No
       * "enter Design Mode" gate anymore -- this is
       * just a persistent stylesheet for the resume,
       * editable any time from the Design panel.
       */

      resumeDesign: { styles: {} },

      /*
       * ==========================================
       * Editor State
       * ==========================================
       */

      zoom: 100,
      sectionOrder: [...DEFAULT_SECTION_ORDER],
      sectionLabels: { ...DEFAULT_SECTION_LABELS },

      /*
       * ==========================================
       * Builder Actions
       * ==========================================
       */

      setResumeData: (updater) =>
        set((state) => ({
          resumeData:
            typeof updater === "function"
              ? updater(state.resumeData)
              : updater,
        })),

      setActiveSection: (activeSection) => set({ activeSection }),

      selectTemplate: (templateId) =>
        set({
          selectedTemplateId: templateId,
          originTemplateId: templateId,
          isTemplateLocked: true,
        }),

      changeTemplate: (templateId) => set({ selectedTemplateId: templateId }),

      clearCurrentSection: (section) =>
        set((state) => {
          const defaults = createDefaultResumeData();

          if (!Object.prototype.hasOwnProperty.call(defaults, section)) {
            return state;
          }

          return {
            resumeData: {
              ...state.resumeData,
              [section]: structuredClone(defaults[section]),
            },
          };
        }),

      /*
       * ==========================================
       * Editor Actions
       * ==========================================
       */

      setZoom: (zoom) => set({ zoom }),

      updateSettings: (newSettings) =>
        set((state) => ({ settings: { ...state.settings, ...newSettings } })),

      updateSectionOrder: (sectionOrder) => set({ sectionOrder }),

      updateSectionLabel: (sectionName, label) =>
        set((state) => ({
          sectionLabels: { ...state.sectionLabels, [sectionName]: label },
        })),

      resetSectionLayout: () =>
        set({
          sectionOrder: [...DEFAULT_SECTION_ORDER],
          sectionLabels: { ...DEFAULT_SECTION_LABELS },
        }),

      /*
       * ==========================================
       * Global Design Styles
       * ==========================================
       */

      setResumeDesign: (resumeDesign) => set({ resumeDesign }),

      resetResumeDesign: () => set({ resumeDesign: { styles: {} } }),

      /*
       * ==========================================
       * Inline Content Editing
       * ==========================================
       *
       * Called directly from section components --
       * no callback-prop threading through
       * PageEngine/DynamicTemplate needed.
       */

      // resumeData.personal.*
      updatePersonalField: (field, value) =>
        set((state) => ({
          resumeData: {
            ...state.resumeData,
            personal: { ...state.resumeData.personal, [field]: value },
          },
        })),

      // top-level string fields, e.g. resumeData.summary
      updateTopLevelField: (field, value) =>
        set((state) => ({
          resumeData: { ...state.resumeData, [field]: value },
        })),

      // any array-based section item, e.g. experience[i].description
      updateArrayItemField: (sectionName, itemId, field, value) =>
        set((state) => {
          const list = state.resumeData[sectionName];
          if (!Array.isArray(list)) return state;

          return {
            resumeData: {
              ...state.resumeData,
              [sectionName]: list.map((item) =>
                item.id === itemId ? { ...item, [field]: value } : item
              ),
            },
          };
        }),
    }),

    {
      name: "resume-builder-store",

      partialize: (state) => ({
        resumeData: state.resumeData,
        selectedTemplateId: state.selectedTemplateId,
        originTemplateId: state.originTemplateId,
        isTemplateLocked: state.isTemplateLocked,
        resumeDesign: state.resumeDesign,
        zoom: state.zoom,
        settings: state.settings,
        sectionOrder: state.sectionOrder,
        sectionLabels: state.sectionLabels,
      }),

      onRehydrateStorage: () => (state) => {
        if (state) {
          state.activeSection = "personal";
        }
      },
    }
  )
);