import type {Feature, PageBlock} from "@/types/content";
import {CmsIcon} from "@/components/CmsIcon";
import {CONTENT, list, sectionClass, SectionHeading, text} from "./shared";

export function ProcessSection({block}: { block: PageBlock }) {
    return <section id={text(block.anchorId)} className={sectionClass(block)}>
        <div className={CONTENT}>
            <SectionHeading eyebrow={text(block.eyebrow)} title={text(block.title)} body={text(block.text)}/>
            <div className="grid grid-cols-4 gap-8 max-[1000px]:grid-cols-2 max-[600px]:grid-cols-1">
                {list<Feature>(block.steps).map((step, index) => <article key={step.id || index}>
                    {step.icon
                        ? <CmsIcon icon={step.icon} className="mb-4" />
                        : <span className="mb-3 block font-[Hanken] text-[40px] font-extrabold text-[#8fc8ef]">{String(index + 1).padStart(2, "0")}</span>}
                    <h3 className="mb-3.5 text-base font-bold leading-[1.2]">{step.title}</h3>
                    <p className="m-0 text-base leading-[1.6] opacity-[.78]">{step.text}</p>
                </article>)}
            </div>
        </div>
    </section>;
}
