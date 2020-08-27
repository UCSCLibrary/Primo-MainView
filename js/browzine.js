/*
 *  Begin BrowZine - Primo Integration...
 */
  window.browzine = {
    api: "https://public-api.thirdiron.com/public/v1/libraries/89",
    apiKey: "1fca6dbe-b86e-4128-b9a7-555bb66f4313",
 
    journalCoverImagesEnabled: true,
 
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
  };
 
  browzine.script = document.createElement("script");
  browzine.script.src = "https://s3.amazonaws.com/browzine-adapters/primo/browzine-primo-adapter.js";
  document.head.appendChild(browzine.script);
  // IMPORTANT: Upgrade conflict:
  // Component and controller code moved to hathiTrustAvailability.js

// ... End BrowZine - Primo Integration
