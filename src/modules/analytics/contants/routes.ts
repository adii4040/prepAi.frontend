export class AnalysisApiRoutes {
    public static get UPLOAD_RESUME() {
        return '/resume-analysis'
    }

    public static GET_ANALYSIS(id: string) {
        return `/resume-analysis/user/${id}`;
    }

    public static get GET_ALL_ANALYSES() {
        return '/resume-analysis/user/all';
    }
}