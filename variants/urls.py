from django.conf.urls import url
from . import views


app_name = "variants"
urlpatterns = [
    # Views for Case
    url(regex=r"^(?P<project>[0-9a-f-]+)/$", view=views.CaseListView.as_view(), name="case-list"),
    url(
        regex=r"^(?P<project>[0-9a-f-]+)/sync-upstream/$",
        view=views.CaseListSyncRemoteView.as_view(),
        name="case-list-sync-remote",
    ),
    url(
        regex=r"^(?P<project>[0-9a-f-]+)/api-qc/$",
        view=views.CaseListQcStatsApiView.as_view(),
        name="api-project-qc",
    ),
    url(
        regex=r"^(?P<project>[0-9a-f-]+)/case/(?P<case>[0-9a-f-]+)/$",
        view=views.CaseDetailView.as_view(),
        name="case-detail",
    ),
    url(
        regex=r"^(?P<project>[0-9a-f-]+)/case/update/(?P<case>[0-9a-f-]+)/$",
        view=views.CaseUpdateView.as_view(),
        name="case-update",
    ),
    url(
        regex=r"^(?P<project>[0-9a-f-]+)/case/api-qc/(?P<case>[0-9a-f-]+)/$",
        view=views.CaseDetailQcStatsApiView.as_view(),
        name="api-case-qc",
    ),
    url(
        regex=r"^(?P<project>[0-9a-f-]+)/case/filter/(?P<case>[0-9a-f-]+)/$",
        view=views.CaseFilterView.as_view(),
        name="case-filter",
    ),
    url(
        regex=r"^(?P<project>[0-9a-f-]+)/case/filter/(?P<case>[0-9a-f-]+)/job/(?P<job>[0-9a-f-]+)/$",
        view=views.CaseFilterView.as_view(),
        name="case-filter-job",
    ),
    # Project-wide case filtration.
    url(
        regex=r"^(?P<project>[0-9a-f-]+)/project-cases/filter/$",
        view=views.ProjectCasesFilterView.as_view(),
        name="project-cases-filter",
    ),
    url(
        regex=r"^(?P<project>[0-9a-f-]+)/project-cases/filter/job/(?P<job>[0-9a-f-]+)/$",
        view=views.ProjectCasesFilterView.as_view(),
        name="project-cases-filter-job",
    ),
    # View for list background jobs
    url(
        regex=r"^(?P<project>[0-9a-f-]+)/jobs/list/(?P<case>[0-9a-f-]+)/$",
        view=views.BackgroundJobListView.as_view(),
        name="job-list",
    ),
    # Views for project sync jobs.
    url(
        regex=r"^(?P<project>[0-9a-f-]+)/sync-job/(?P<job>[0-9a-f-]+)/$",
        view=views.SyncJobDetailView.as_view(),
        name="sync-job-detail",
    ),
    # Views for variants import job.
    url(
        regex=r"^(?P<project>[0-9a-f-]+)/import/(?P<job>[0-9a-f-]+)/$",
        view=views.ImportVariantsJobDetailView.as_view(),
        name="import-job-detail",
    ),
    # Views for single-case file export jobs.
    url(
        regex=r"^(?P<project>[0-9a-f-]+)/export-job/detail/(?P<job>[0-9a-f-]+)/$",
        view=views.ExportFileJobDetailView.as_view(),
        name="export-job-detail",
    ),
    url(
        regex=r"^(?P<project>[0-9a-f-]+)/export-job/resubmit/(?P<job>[0-9a-f-]+)/$",
        view=views.ExportFileJobResubmitView.as_view(),
        name="export-job-resubmit",
    ),
    url(
        regex=r"^(?P<project>[0-9a-f-]+)/export-job/download/(?P<job>[0-9a-f-]+)/$",
        view=views.ExportFileJobDownloadView.as_view(),
        name="export-job-download",
    ),
    # Views for project-wide cases file export jobs.
    url(
        regex=r"^(?P<project>[0-9a-f-]+)/project-cases-export-job/detail/(?P<job>[0-9a-f-]+)/$",
        view=views.ExportProjectCasesFileJobDetailView.as_view(),
        name="project-cases-export-job-detail",
    ),
    url(
        regex=r"^(?P<project>[0-9a-f-]+)/project-cases-export-job/resubmit/(?P<job>[0-9a-f-]+)/$",
        view=views.ExportProjectCasesFileJobResubmitView.as_view(),
        name="project-cases-export-job-resubmit",
    ),
    url(
        regex=r"^(?P<project>[0-9a-f-]+)/project-cases-export-job/download/(?P<job>[0-9a-f-]+)/$",
        view=views.ExportProjectCasesFileJobDownloadView.as_view(),
        name="project-cases-export-job-download",
    ),
    # Views for MutationDistiller submission jobs
    url(
        regex=r"^(?P<project>[0-9a-f-]+)/distiller-job/detail/(?P<job>[0-9a-f-]+)/$",
        view=views.DistillerSubmissionJobDetailView.as_view(),
        name="distiller-job-detail",
    ),
    url(
        regex=r"^(?P<project>[0-9a-f-]+)/distiller-job/resubmit/(?P<job>[0-9a-f-]+)/$",
        view=views.DistillerSubmissionJobResubmitView.as_view(),
        name="distiller-job-resubmit",
    ),
    # Views for Project-wide Statistics Computation submission jobs
    url(
        regex=r"^(?P<project>[0-9a-f-]+)/project-stats-job/create/$",
        view=views.ProjectStatsJobCreateView.as_view(),
        name="project-stats-job-create",
    ),
    url(
        regex=r"^(?P<project>[0-9a-f-]+)/project-stats-job/detail/(?P<job>[0-9a-f-]+)/$",
        view=views.ProjectStatsJobDetailView.as_view(),
        name="project-stats-job-detail",
    ),
    # API for accessing small variant flags and comments.
    url(
        regex=r"^(?P<project>[0-9a-f-]+)/case/small-variant-flags/(?P<case>[0-9a-f-]+)/$",
        view=views.SmallVariantFlagsApiView.as_view(),
        name="small-variant-flags-api",
    ),
    url(
        regex=r"^(?P<project>[0-9a-f-]+)/case/small-variant-comment/(?P<case>[0-9a-f-]+)/$",
        view=views.SmallVariantCommentApiView.as_view(),
        name="small-variant-comment-api",
    ),
    url(
        regex=r"^(?P<project>[0-9a-f-]+)/case/small-variant-acmg-rating/(?P<case>[0-9a-f-]+)/$",
        view=views.AcmgCriteriaRatingApiView.as_view(),
        name="acmg-rating-api",
    ),
    url(
        regex=r"^(?P<project>[0-9a-f-]+)/case/case-notes/(?P<case>[0-9a-f-]+)/$",
        view=views.CaseNotesStatusApiView.as_view(),
        name="case-notes-status-api",
    ),
    url(
        regex=r"^(?P<project>[0-9a-f-]+)/case/case-comments-submit/(?P<case>[0-9a-f-]+)/$",
        view=views.CaseCommentsSubmitApiView.as_view(),
        name="case-comments-submit-api",
    ),
    url(
        regex=r"^(?P<project>[0-9a-f-]+)/case/case-comments-delete/(?P<case>[0-9a-f-]+)/$",
        view=views.CaseCommentsDeleteApiView.as_view(),
        name="case-comments-delete-api",
    ),
    # Views for filtering and storing case query results jobs
    url(
        regex=r"^(?P<project>[0-9a-f-]+)/case/filter-results/(?P<case>[0-9a-f-]+)/$",
        view=views.CasePrefetchFilterView.as_view(),
        name="case-filter-results",
    ),
    url(
        regex=r"^(?P<project>[0-9a-f-]+)/filter-job/detail/(?P<job>[0-9a-f-]+)/$",
        view=views.FilterJobDetailView.as_view(),
        name="filter-job-detail",
    ),
    url(
        regex=r"^(?P<project>[0-9a-f-]+)/filter-job/resubmit/(?P<job>[0-9a-f-]+)/$",
        view=views.FilterJobResubmitView.as_view(),
        name="filter-job-resubmit",
    ),
    url(
        regex=r"^(?P<project>[0-9a-f-]+)/case/load-filter-results/(?P<case>[0-9a-f-]+)/$",
        view=views.CaseLoadPrefetchedFilterView.as_view(),
        name="case-load-filter-results",
    ),
    url(
        regex=r"^(?P<project>[0-9a-f-]+)/filter-job/status/$",
        view=views.FilterJobGetStatus.as_view(),
        name="filter-job-status",
    ),
    url(
        regex=r"^(?P<project>[0-9a-f-]+)/filter-job/previous/(?P<case>[0-9a-f-]+)/$",
        view=views.FilterJobGetPrevious.as_view(),
        name="filter-job-previous",
    ),
    # Views for filtering and storing project cases query results jobs
    url(
        regex=r"^(?P<project>[0-9a-f-]+)/project-cases/filter-results/$",
        view=views.ProjectCasesPrefetchFilterView.as_view(),
        name="project-cases-filter-results",
    ),
    url(
        regex=r"^(?P<project>[0-9a-f-]+)/project-cases-filter-job/detail/(?P<job>[0-9a-f-]+)/$",
        view=views.ProjectCasesFilterJobDetailView.as_view(),
        name="project-cases-filter-job-detail",
    ),
    url(
        regex=r"^(?P<project>[0-9a-f-]+)/project-cases-filter-job/resubmit/(?P<job>[0-9a-f-]+)/$",
        view=views.ProjectCasesFilterJobResubmitView.as_view(),
        name="project-cases-filter-job-resubmit",
    ),
    url(
        regex=r"^(?P<project>[0-9a-f-]+)/project-cases/load-filter-results/$",
        view=views.ProjectCasesLoadPrefetchedFilterView.as_view(),
        name="project-cases-load-filter-results",
    ),
    url(
        regex=r"^(?P<project>[0-9a-f-]+)/project-cases-filter-job/status/$",
        view=views.ProjectCasesFilterJobGetStatus.as_view(),
        name="project-cases-filter-job-status",
    ),
    url(
        regex=r"^(?P<project>[0-9a-f-]+)/project-cases-filter-job/previous/$",
        view=views.ProjectCasesFilterJobGetPrevious.as_view(),
        name="project-cases-filter-job-previous",
    ),
    # Render details row
    url(
        regex=(
            r"^(?P<project>[0-9a-f-]+)/case/small-variant-details/(?P<case>[0-9a-f-]+)/"
            r"(?P<release>(GRCh37|GRCh38))-(?P<chromosome>(chr)?([0-9]{1,2}|[XY]|MT]))-(?P<start>[0-9]+)-(?P<end>[0-9]+)-"
            r"(?P<reference>[ACGT]+)-(?P<alternative>[ACGT]+)/(?P<database>[^/]+)/(?P<gene_id>[^/]+)/"
            r"(?P<ensembl_transcript_id>[^/]+)/(?P<training_mode>[01])/$"
        ),
        view=views.SmallVariantDetails.as_view(),
        name="small-variant-details",
    ),
    # Set last seen changelog version for user and redirect to changelog.
    # TODO: move to sodar-core?
    url(regex=r"^new-features/$", view=views.NewFeaturesView.as_view(), name="new-features"),
]
