import allQuestionTypes from "./all-question-types.json";

interface FormTemplate {
	id: string;
	title: string;
	description: string;
	sections: Array<{
		id: string;
		title: string;
		description: string;
		order: number;
		questions: Array<{
			id: string;
			questionText: string;
			questionDescription?: string;
			questionType: string;
			required: boolean;
			config?: Record<string, unknown>;
			order: number;
		}>;
	}>;
}

export const templates: Record<string, FormTemplate> = {
	allQuestionTypes,
};

export default templates;
