export interface MarketSnapshot {
    summary: string;
    trendingTechnologies: string[];
    industryExpectations: string[];
    marketGaps: string[];
    _id: string;
}

export interface SkillGap {
    skillName: string;
    severity: string;
    context: string;
    _id: string;
}

export interface DailySchedule {
    dayNumber: number;
    focusTopic: string;
    actionItems: string[];
    _id: string;
}

export interface PreparationPlan {
    timelineType: string;
    daysRemaining: number;
    dailySchedule: DailySchedule[];
    _id: string;
}

export interface Question {
    id: number;
    type: string;
    question: string;
    intent: string;
    suggestedTalkingPoints: string[];
    _id: string;
}

export interface AnalysisRecord {
    _id: string;
    userId: string;
    resumeFileUrl: string;
    analysisTitle: string;
    matchScore: number;
    needsImprovement?: string;
    marketSnapshot: MarketSnapshot;
    skillGaps?: SkillGap[];
    preparationPlan?: PreparationPlan;
    topTechnicalQuestions?: Question[];
    topBehavioralQuestions?: Question[];
    createdAt: string;
    updatedAt: string;
    __v: number;
}

export interface GetAnalyticReportResDto {
    statusCode: number;
    data: {
        analysisRecord: AnalysisRecord;
    };
    message: string;
    success: boolean;
}

export interface GetAllAnalyticReportsResDto {
    statusCode: number;
    data: {
        analysisRecords: AnalysisRecord[];
    };
    message: string;
    success: boolean;
}
