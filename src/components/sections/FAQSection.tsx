"use client";

import Link from "next/link";
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "@/components/ui/accordion";
import { FAQ_CONTENT, type FAQLink } from "@/constants/faq";

export function FAQSection() {
	return (
		<section id="faq" className="section-secondary py-24">
			<div className="max-w-7xl mx-auto px-6">
				<div className="text-center mb-16">
					<h2 className="text-4xl md:text-5xl font-bold mb-6">
						{FAQ_CONTENT.title}
					</h2>
					<p className="text-xl text-muted-foreground max-w-3xl mx-auto">
						{FAQ_CONTENT.description}
					</p>
				</div>

				<Accordion type="single" collapsible className="space-y-4">
					{FAQ_CONTENT.items.map((item, index) => (
						<AccordionItem
							key={item.question}
							value={`item-${index}`}
							className="bg-card border border-border rounded-2xl overflow-hidden hover:border-primary/30 transition-all duration-200 last:border-b"
						>
							<AccordionTrigger className="px-6 py-5 text-left hover:bg-accent/5 transition-colors duration-200 hover:no-underline">
								<h3 className="text-lg font-medium pr-4">{item.question}</h3>
							</AccordionTrigger>
							<AccordionContent className="px-6 pb-5 border-t border-border">
								<p className="text-muted-foreground leading-relaxed pt-5">
									{item.answer}{" "}
									{"links" in item &&
										item.links &&
										item.links.map((link: FAQLink, index: number) => {
											const isExternal = link.url.startsWith("http");
											const linkClasses =
												"text-primary hover:text-primary/80 underline";

											return (
												<span key={link.url}>
													{isExternal ? (
														<a
															href={link.url}
															target="_blank"
															rel="noopener noreferrer"
															className={linkClasses}
														>
															{link.label ?? link.url}
														</a>
													) : (
														<Link href={link.url} className={linkClasses}>
															{link.label ?? link.url}
														</Link>
													)}
													{item.links && index < item.links.length - 1 && " · "}
												</span>
											);
										})}
								</p>
							</AccordionContent>
						</AccordionItem>
					))}
				</Accordion>
			</div>
		</section>
	);
}
