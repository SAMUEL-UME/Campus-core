"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { academicTaxonomy } from "@/data/academic-taxonomy";
import { changeContext, type AcademicContext, type Section } from "./context";

export function ContextSelector({
  context,
  section,
}: {
  context: AcademicContext;
  section: Section;
}) {
  const [draft, setDraft] = useState(context);
  const fields = [
    {
      key: "university",
      label: "University",
      options: academicTaxonomy.universities,
      disabled: false,
    },
    {
      key: "faculty",
      label: "Faculty",
      options: academicTaxonomy.faculties.filter(
        (item) => item.universityId === draft.university,
      ),
      disabled: !draft.university,
    },
    {
      key: "department",
      label: "Department",
      options: academicTaxonomy.departments.filter(
        (item) => item.facultyId === draft.faculty,
      ),
      disabled: !draft.faculty,
    },
    {
      key: "level",
      label: "Academic level",
      options: academicTaxonomy.levels.filter(
        (item) => item.departmentId === draft.department,
      ),
      disabled: !draft.department,
    },
  ] as const;
  const department = academicTaxonomy.departments.find(
    (item) => item.id === draft.department && item.facultyId === draft.faculty,
  );
  return (
    <form action={`/${section}`} method="get" className="space-y-4">
      <fieldset className="grid gap-4 sm:grid-cols-2">
        <legend className="mb-4 text-lg font-semibold">
          Choose your academic context
        </legend>
        {fields.map((field) => (
          <div key={field.key} className="min-w-0 space-y-2">
            <label htmlFor={field.key} className="block text-sm font-medium">
              {field.label}
            </label>
            <select
              id={field.key}
              name={field.key}
              value={draft[field.key]}
              required
              disabled={field.disabled}
              onChange={(event) =>
                setDraft(changeContext(draft, field.key, event.target.value))
              }
              className="min-h-11 w-full min-w-0 rounded-md border border-border bg-background px-3 py-2 text-base disabled:opacity-60"
            >
              <option value="">Select {field.label.toLowerCase()}</option>
              {field.options.map((option) => (
                <option key={option.id} value={option.id}>
                  {option.name}
                </option>
              ))}
            </select>
            {!field.disabled && field.options.length === 0 && (
              <p className="text-sm">No demo options available yet.</p>
            )}
          </div>
        ))}
      </fieldset>
      <div aria-live="polite" className="text-sm text-muted-foreground">
        {department?.verificationNotes && (
          <p>
            <strong>Verification note:</strong> {department.verificationNotes}
          </p>
        )}
      </div>
      <p className="text-sm text-muted-foreground">
        Changing a parent choice resets dependent choices. Apply your selection
        to update the page and navigation.
      </p>
      <Button type="submit" disabled={!draft.level}>
        Apply selection
      </Button>
    </form>
  );
}
