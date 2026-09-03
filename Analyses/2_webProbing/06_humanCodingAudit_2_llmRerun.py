"""
Human-coding audit: step 2 -- re-run the sampled comprehension-probe responses
through a single clean classification prompt (Understood / Partially Understood /
Not Understood), so the output is directly comparable to your independent human
coding for computing agreement / Cohen's kappa.

Same model, provider, and determinism setting already used for the manuscript's
original LLM analysis (03_analyzeDataLLMs.ipynb): meta-llama/Llama-3.3-70B-Instruct
via Together AI (Hugging Face router), temperature=0.

This re-processes text you already collected -- no new participant data, and no
change to the original per-item summaries in output/LLM/. Requires your own
Hugging Face API key in src/API_key_adjust.py (see src/API_key_adjust.py --
same file the original notebook uses; NOT committed with a real key).

Input:  output/humanCodingAudit/llm_rerun_input.csv  (from 06_humanCodingAudit_1_sample.R)
Output: output/humanCodingAudit/llm_rerun_output.csv {sample_id, llm_code, llm_raw}

Run from: Article_ESTAvalidation/Analyses/2_webProbing/
    python3 07_humanCodingAudit_2_llmRerun.py
"""

import csv
import sys
import time
from pathlib import Path

sys.path.insert(0, str(Path(__file__).parent / "src"))
import API_key as key  # noqa: E402

from openai import OpenAI  # noqa: E402

IN_PATH = Path("output/humanCodingAudit/llm_rerun_input.csv")
OUT_PATH = Path("output/humanCodingAudit/llm_rerun_output.csv")

VALID_CODES = ["Understood", "Partially Understood", "Not Understood"]

SYSTEM_PROMPT = """You are a cognitive science expert specializing in cognitive interviews and web probing
for survey methodology. Your task is to classify, for a single participant response to a
comprehension probe, whether the participant understood the key term or concept asked about.

Respond with EXACTLY one of these three labels, and nothing else:
Understood
Partially Understood
Not Understood

- Understood: the response clearly and correctly reflects the intended meaning of the question/term.
- Partially Understood: the response is on-topic but vague, incomplete, or partially off-target.
- Not Understood: the response reflects a clear misunderstanding, non-answer, or unrelated content.
"""

USER_TEMPLATE = """Comprehension probe question: {item_question}

Participant response: {response_text}

Classification (one of: Understood / Partially Understood / Not Understood):"""


def main():
    if not IN_PATH.exists():
        raise SystemExit(f"Input not found: {IN_PATH}. Run 06_humanCodingAudit_1_sample.R first.")

    client = OpenAI(
        base_url="https://router.huggingface.co/v1",
        api_key=key.hugging_api_key,
    )

    rows = list(csv.DictReader(IN_PATH.open(encoding="utf-8")))
    results = []

    for i, row in enumerate(rows):
        print(f"{i + 1}/{len(rows)}  {row['sample_id']}  ({row['item']})")
        user_content = USER_TEMPLATE.format(
            item_question=row["item_question"], response_text=row["response_text"]
        )
        completion = client.chat.completions.create(
            model="meta-llama/Llama-3.3-70B-Instruct:together",
            messages=[
                {"role": "system", "content": SYSTEM_PROMPT},
                {"role": "user", "content": user_content},
            ],
            stream=False,
            max_tokens=20,
            temperature=0,
        )
        raw = completion.choices[0].message.content.strip()
        code = next((c for c in VALID_CODES if c.lower() in raw.lower()), None)
        if code is None:
            print(f"  WARNING: could not map raw output to a valid code: {raw!r}")
        results.append({"sample_id": row["sample_id"], "llm_code": code or "", "llm_raw": raw})
        time.sleep(0.2)  # light rate-limit courtesy

    OUT_PATH.parent.mkdir(parents=True, exist_ok=True)
    with OUT_PATH.open("w", newline="", encoding="utf-8") as f:
        writer = csv.DictWriter(f, fieldnames=["sample_id", "llm_code", "llm_raw"])
        writer.writeheader()
        writer.writerows(results)

    n_unmapped = sum(1 for r in results if not r["llm_code"])
    print(f"\nWrote {OUT_PATH} ({len(results)} rows, {n_unmapped} unmapped -- check llm_raw for those).")


if __name__ == "__main__":
    main()
