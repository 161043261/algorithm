---
name: algorithm
description: Use this skill whenever the user provides one or more written-exam images in frontend, backend, or AI domains and wants the questions extracted, reconstructed, answered, explained, or saved as a local markdown document. This skill is required for multi-image exam screenshots, question consolidation, Chinese answer explanations, and programming questions that must include Go, Python, TypeScript, and C++ solutions. If the user does not provide the output markdown path, ask for it before proceeding.
---

# Algorithm

Process one or more written-exam screenshots, reconstruct the complete set of questions, and produce a deliverable markdown solution document with professional Chinese explanations.

## Purpose

Use this skill to do all of the following in one workflow:

- read one or more written-exam images
- reconstruct complete questions from fragmented screenshots
- classify each question by type
- answer objective and subjective questions with professional Chinese explanations
- solve programming questions in Go, Python, TypeScript, and C++
- save the final result to a local markdown file

## Required Inputs

Confirm these inputs before doing substantive work:

1. At least one readable image, attachment, or image path containing the exam questions.
2. A target markdown file path for the final output.
3. Any extra user preferences, such as partial question selection, preferred ordering, preservation of original wording, or formatting constraints.

If the images are missing, ask the user to provide them.

If the output markdown path is missing, ask the user where to write the file. Do not guess a path, do not invent a filename, and do not silently choose the current directory.

If the target file already exists and the user did not specify whether to overwrite, append, or create a new file, ask first.

## Workflow

### 1. Clarify Scope

Before extracting anything, verify:

- how many images are involved
- whether the image order is known
- whether the user wants all questions solved or only a subset
- whether the final deliverable should contain answers, explanations, or question transcription only
- where the markdown file should be written

If any of these details are missing and they affect correctness, ask concise follow-up questions first.

### 2. Extract Content From Images

Read the images in the user-provided order. Preserve the raw structure of the source material as carefully as possible.

Capture these elements whenever present:

- question number
- question stem
- answer choices
- code snippets
- sample input and output
- tables, formulas, and constraints
- scoring notes, instructions, and multi-select hints

If one question is split across multiple images, merge the fragments into one coherent question.

If multiple images contain duplicate content, keep the clearest and most complete version.

If any text is uncertain because the image is blurry or the recognition is ambiguous, do not fabricate missing details. Mark the uncertain segment explicitly and tell the user where the uncertainty is.

### 3. Reconstruct the Full Question Set

Build a structured question list from the extracted material.

Follow these reconstruction rules:

- preserve the original question order whenever it can be inferred
- keep the original meaning intact
- repair obvious line breaks only when the intended sentence is clear
- merge continued content across screenshots
- mark genuinely uncertain fields as uncertain instead of guessing

If the image set mixes frontend, backend, and AI questions, preserve the actual mix. Do not force an incorrect category.

### 4. Identify the Question Type and Answer Accordingly

For each question, determine the type and use the matching output contract below.

#### Single-choice and multiple-choice questions

Include:

- question
- options
- correct answer
- professional Chinese explanation

Requirements:

- keep the original option order
- support multiple correct options when the question is multi-select
- if an option is ambiguous because of recognition noise, mention the ambiguity before giving the best-supported answer
- explain why the correct answer is correct and briefly note why common wrong choices fail

#### Short-answer and essay questions

Include:

- question
- reference answer
- professional Chinese explanation

Requirements:

- cover the key points that the question expects
- explain the reasoning, trade-offs, architecture, or underlying principles where relevant
- for open-ended questions, provide a strong reference answer rather than pretending there is only one possible wording

#### Programming questions

Include:

- question
- solution approach
- algorithm explanation
- time complexity
- space complexity
- Go solution
- Python solution
- TypeScript solution
- C++ solution

Requirements:

- make all four implementations runnable whenever the prompt provides enough information
- keep the core algorithm consistent across languages
- use clear variable names and interview-quality structure
- reflect the required input and output format in each implementation
- prefer the most reliable and explainable approach over an unnecessarily clever one

When multiple Go answers are generated into the same directory and package, do not keep multiple `main` functions in different `.go` files. In that case, convert each Go answer into a callable solve function such as `Solve2` or `Solve3`, place runnable validation in a corresponding `_test.go` file, and add a short comment above each test function showing the exact `go test -run ...` command for that file.

## Output Document

Write the final result to the user-specified local markdown file.

Use this structure by default and remove sections that do not apply:

```markdown
# Written Exam Analysis

## Source Summary

- Image count:
- Domain:
- Notes:

## Reconstructed Questions

### Question 1 [Type]

#### Question

...

#### Options

- A. ...
- B. ...
- C. ...
- D. ...

#### Answer

...

#### Explanation

...

### Question N [Programming]

#### Question

...

#### Solution Approach

...

#### Complexity

- Time:
- Space:

#### Go

[Insert Go code block]

#### Python

[Insert Python code block]

#### TypeScript

[Insert TypeScript code block]

#### C++

[Insert C++ code block]
```

If the user asks only for transcription, do not add answers or explanations that were not requested.

## Completion Step

After preparing the content:

- write the markdown file to the target path
- report the final output path back to the user
- summarize how many images were processed and how many questions were reconstructed
- mention the detected question types
- call out any low-confidence OCR segments that need manual review

## Quality Bar

Maintain all of the following standards:

- write all explanations in professional Chinese
- do not invent material that is not supported by the images
- do not drop constraints, edge cases, or input-output requirements
- do not stop at a high-level idea for programming questions; provide full implementations
- prioritize completeness, deduplication, and correct ordering across multiple images
- when the source material is too incomplete for a reliable answer, say what is missing and what the user needs to provide

## Decision Rules

Handle common edge cases as follows:

- If the user wants only question extraction, transcribe and reconstruct the questions without adding answers.
- If the user wants only selected questions solved, solve only those questions and leave the others untouched or briefly reconstructed.
- If the user requests a non-markdown output, explain that this skill defaults to markdown and adapt only if the user clearly wants a different format.
- If the technical domain is not specified, infer it from the content instead of asking prematurely.
- If image order is unclear and that ambiguity affects reconstruction, ask the user to confirm the intended order.

## Response Style

Keep the conversation with the user concise and operational.

Keep the generated markdown document complete, structured, and ready for direct delivery.
