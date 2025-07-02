/*
 *  Begin BrowZine - Primo Integration...
 */
  window.browzine = {
    libraryId: "89",
    apiKey: "19142e7e-026a-4466-8a20-05a3f1735152",
 
    journalCoverImagesEnabled: true,
    showFormatChoice: true,
    showLinkResolverLink: true,
    enableLinkOptimizer: true,

    journalBrowZineWebLinkTextEnabled: true,
    journalBrowZineWebLinkText: "View Journal Contents",

    articleBrowZineWebLinkTextEnabled: true,
    articleBrowZineWebLinkText: "View Issue Contents",

    articlePDFDownloadLinkEnabled: true,
    articlePDFDownloadLinkText: "Download PDF",

    articleLinkEnabled: true,
    articleLinkText: "Read Article",

    printRecordsIntegrationEnabled: true,

    unpaywallEmailAddressKey: "enter-your-email@your-institution-domain.edu",

    articlePDFDownloadViaUnpaywallEnabled: true,
    articlePDFDownloadViaUnpaywallText: "Download PDF (via Unpaywall)",

    articleLinkViaUnpaywallEnabled: true,
    articleLinkViaUnpaywallText: "Read Article (via Unpaywall)",

    articleAcceptedManuscriptPDFViaUnpaywallEnabled: true,
    articleAcceptedManuscriptPDFViaUnpaywallText: "Download PDF (Accepted Manuscript via Unpaywall)",

    articleAcceptedManuscriptArticleLinkViaUnpaywallEnabled: true,
    articleAcceptedManuscriptArticleLinkViaUnpaywallText: "Read Article (Accepted Manuscript via Unpaywall)",

    articleRetractionWatchEnabled: true,
    articleRetractionWatchText: "Retracted Article",

    articleExpressionOfConcernEnabled: true,
    articleExpressionOfConcernText: "Expression of Concern",

    problematicJournalEnabled: true,
    problematicJournalText: "Problematic Journal",

    documentDeliveryFulfillmentText: "Request PDF",
  };
 
  browzine.script = document.createElement("script");
  browzine.script.src = "https://s3.amazonaws.com/browzine-adapters/primo/browzine-primo-adapter.js";
  document.head.appendChild(browzine.script);
  // IMPORTANT: Upgrade conflict:
  // Component and controller code moved to hathiTrustAvailability.js

// ... End BrowZine - Primo Integration
