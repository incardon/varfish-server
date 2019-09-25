var effectGroups = {
  all: [
  ],
  nonsynonymous: [
    "complex_substitution",
    "direct_tandem_duplication",
    "disruptive_inframe_deletion",
    "disruptive_inframe_insertion",
    "exon_loss_variant",
    "feature_truncation",
    "frameshift_elongation",
    "frameshift_truncation",
    "frameshift_variant",
    "inframe_deletion",
    "inframe_insertion",
    "internal_feature_elongation",
    "missense_variant",
    "mnv",
    "start_lost",
    "stop_gained",
    "stop_lost",
    "structural_variant",
    "transcript_ablation"
  ],
  splicing: [
    "splice_acceptor_variant",
    "splice_donor_variant",
    "splice_region_variant"
  ],
  coding: [
    "stop_retained_variant",
    "synonymous_variant"
  ],
  utr_intronic: [
    "coding_transcript_intron_variant",
    "five_prime_UTR_exon_variant",
    "five_prime_UTR_intron_variant",
    "three_prime_UTR_exon_variant",
    "three_prime_UTR_intron_variant"
  ],
  noncoding: [
    "downstream_gene_variant",
    "intergenic_variant",
    "downstream_gene_variant",
    "downstream_gene_variant",
    "non_coding_transcript_exon_variant",
    "non_coding_transcript_intron_variant",
    "upstream_gene_variant"
  ],
  nonsense: [
    "frameshift_elongation",
    "frameshift_truncation",
    "frameshift_variant",
    "start_lost",
    "stop_gained",
    "stop_lost",
    "splice_acceptor_variant",
    "splice_donor_variant",
  ],
};

effectGroups.all = effectGroups.nonsynonymous
  .concat(effectGroups.splicing)
  .concat(effectGroups.coding)
  .concat(effectGroups.utr_intronic)
  .concat(effectGroups.noncoding)
  .concat(effectGroups.nonsense);

function updateEffectGroup(group) {
  let all = _.every(effectGroups[group], function (s) { return $("#id_effect_" + s).prop("checked"); });
  let none = _.every(effectGroups[group], function (s) { return !$("#id_effect_" + s).prop("checked"); });
  if (all) {
    $("#id_effect_group_" + group).prop("checked", true);
    $("#id_effect_group_" + group).prop("indeterminate", false);
  } else if (none) {
    $("#id_effect_group_" + group).prop("checked", false);
    $("#id_effect_group_" + group).prop("indeterminate", false);
  } else {
    $("#id_effect_group_" + group).prop("checked", false);
    $("#id_effect_group_" + group).prop("indeterminate", true);
  }
}

function updateCheckboxes(event) {
  if (this.blocked) {
    return;
  } else {
    this.blocked = true;
  }

  if (event !== null && $(this).attr('id').startsWith('id_effect_group_')) {
      // Clicked one of the group buttons itself.
      let id = $(this).attr('id').substring("id_effect_group_".length);
      let checked = $(this).prop('checked');
      for (value in effectGroups[id]) {
        $("#id_effect_" + effectGroups[id][value]).prop("checked", checked);
      }

      for (group in effectGroups) {
        if (group != id) {
          updateEffectGroup(group);
        }
      }
  } else {
    for (key in effectGroups) {
      // Clicked one of the detailed buttons.
      updateEffectGroup(key);
    }
  }

  this.blocked = false;
}
updateCheckboxes.blocked = false;

$(document).ready(function() {
  updateCheckboxes(null);
  $(".checkboxinput").change(updateCheckboxes);
});

function mutationTaster(chromosome, position, ref, alt) {
    var form = $('<form target="_blank" method="POST" action="http://www.mutationtaster.org/cgi-bin/MutationTaster/MT_ChrPos.cgi">');
    form.append($('<input type="hidden" name="chromosome" value="' + chromosome + '">'));
    form.append($('<input type="hidden" name="position" value="' + position + '">'));
    form.append($('<input type="hidden" name="ref" value="' + ref + '">'));
    form.append($('<input type="hidden" name="alt" value="' + alt + '">'));
    form.appendTo('body').submit();
}

function polyPhen2(gene, hgvsP) {
    const regex = /^p.([A-Z])(\d+)([A-Z])$/;
    const found = hgvsP.match(regex);
    const seqvar1 = found[1];
    const seqpos = found[2];
    const seqvar2 = found[3];

    var form = $('<form target="_blank" method="POST" action="http://genetics.bwh.harvard.edu/cgi-bin/ggi/ggi2.cgi">');
    form.append($('<input type="hidden" name="_ggi_project" value="PPHWeb2">'));
    form.append($('<input type="hidden" name="_ggi_origin" value="query">'));
    form.append($('<input type="hidden" name="_ggi_target_submit" value="1">'));
    form.append($('<input type="hidden" name="accid" value="' + gene + '">'));
    form.append($('<input type="hidden" name="seqpos" value="' + seqpos + '">'));
    form.append($('<input type="hidden" name="seqvar1" value="' + seqvar1 + '">'));
    form.append($('<input type="hidden" name="seqvar2" value="' + seqvar2 + '">'));
    form.appendTo('body').submit();
}

function humanSplicingFinder(gene, hgvsC) {
    var form = $('<form target="_blank" method="POST" action="http://www.umd.be/HSF3/4DACTION/input_SSF">');
    form.append($('<input type="hidden" name="champlibre" value="' + gene + '">'));
    form.append($('<input type="hidden" name="batch" value="' + hgvsC + '">'));
    form.append($('<input type="hidden" name="choix_analyse" value="ssf_batch">'));
    form.append($('<input type="hidden" name="autoselect" value="yes">'));
    form.append($('<input type="hidden" name="snp_select" value="no">'));
    form.append($('<input type="hidden" name="showonly" value="yes">'));
    form.append($('<input type="hidden" name="geneStatus" value="all">'));
    form.append($('<input type="hidden" name="transcriptStatus" value="all">'));
    form.append($('<input type="hidden" name="nuclposition" value="100">'));
    form.append($('<input type="hidden" name="nuclposition5" value="">'));
    form.append($('<input type="hidden" name="nuclposition3" value="">'));
    form.append($('<input type="hidden" name="choix_bdd" value="gene_name">'));
    form.append($('<input type="hidden" name="exon_number" value="">'));
    form.append($('<input type="hidden" name="intron_number" value="">'));
    form.append($('<input type="hidden" name="remLentext" value="2500">'));
    form.append($('<input type="hidden" name="sequenceWT" value="">'));
    form.append($('<input type="hidden" name="remLentextmut" value="2500">'));
    form.append($('<input type="hidden" name="sequenceMut" value="">'));
    form.append($('<input type="hidden" name="Firstnucleotide" value="">'));
    form.append($('<input type="hidden" name="Lastnucleotide" value="">'));
    form.append($('<input type="hidden" name="remLentextBP" value="100">'));
    form.append($('<input type="hidden" name="sequenceBP" value="">'));
    form.append($('<input type="hidden" name="MDE_sequences" value="">'));
    form.append($('<input type="hidden" name="paramfulltables" value="onlyvariants">'));
    form.append($('<input type="hidden" name="fenetreintron" value="yes">'));
    form.append($('<input type="hidden" name="fenetretaille" value="24">'));
    form.append($('<input type="hidden" name="paramimages" value="no">'));
    form.append($('<input type="hidden" name="matrice_3" value="no">'));
    form.append($('<input type="hidden" name="Matrice" value="PSS">'));
    form.append($('<input type="hidden" name="Matrice" value="maxent">'));
    form.append($('<input type="hidden" name="seuil_maxent5" value="3">'));
    form.append($('<input type="hidden" name="seuil_maxent3" value="3">'));
    form.append($('<input type="hidden" name="seuil_nnsplice5" value="0.4">'));
    form.append($('<input type="hidden" name="seuil_nnsplice3" value="0.4">'));
    form.append($('<input type="hidden" name="Matrice" value="BPS">'));
    form.append($('<input type="hidden" name="Matrice" value="ESE+Finder">'));
    form.append($('<input type="hidden" name="seuil_sf2" value="72.98">'));
    form.append($('<input type="hidden" name="seuil_sf2_esef" value="1.956">'));
    form.append($('<input type="hidden" name="seuil_sf2ig" value="70.51">'));
    form.append($('<input type="hidden" name="seuil_sf2ig_esef" value="1.867">'));
    form.append($('<input type="hidden" name="seuil_sc35" value="75.05">'));
    form.append($('<input type="hidden" name="seuil_sc35_esef" value="2.383">'));
    form.append($('<input type="hidden" name="seuil_srp40" value="78.08">'));
    form.append($('<input type="hidden" name="seuil_srp40_esef" value="2.67">'));
    form.append($('<input type="hidden" name="seuil_srp55" value="73.86">'));
    form.append($('<input type="hidden" name="seuil_srp55_esef" value="2.676">'));
    form.append($('<input type="hidden" name="Matrice" value="RESCUE+ESE">'));
    form.append($('<input type="hidden" name="Matrice" value="ESE+New">'));
    form.append($('<input type="hidden" name="seuil_9g8" value="59.245">'));
    form.append($('<input type="hidden" name="seuil_tra2" value="75.964">'));
    form.append($('<input type="hidden" name="Matrice" value="Sironi">'));
    form.append($('<input type="hidden" name="seuil_sironi1" value="60">'));
    form.append($('<input type="hidden" name="seuil_sironi2" value="60">'));
    form.append($('<input type="hidden" name="seuil_sironi3" value="60">'));
    form.append($('<input type="hidden" name="Matrice" value="Decamers">'));
    form.append($('<input type="hidden" name="Matrice" value="ESS+hnRNP">'));
    form.append($('<input type="hidden" name="seuil_hnrnpa1" value="65.476">'));
    form.append($('<input type="hidden" name="Matrice" value="PESE">'));
    form.append($('<input type="hidden" name="Matrice" value="ESR">'));
    form.append($('<input type="hidden" name="Matrice" value="EIE">'));
    form.appendTo('body').submit();
}

// we can't employ .click here because the html that it will work on is loaded afterwards.
$(document).on('click', '.toggle-variant-details', function() {
  var row = dt.row($(this).parent());
  var icon = $("i", this);

  // using toggleClass to shorten the code results to erroneous icon behaviour in border cases (e.g. fast opening/closing the details)
  if (row.child.isShown()) {
    icon.removeClass('fa-chevron-down');
    icon.addClass('fa-chevron-right');
    row.child.hide();
  }
  else {
    icon.removeClass('fa-chevron-right');
    if (row.child() && row.child().length) {
      icon.addClass('fa-chevron-down');
      row.child.show();
    }
    else {
      icon.addClass('fa-spinner fa-spin');
      $.ajax(
        $(this).data('url'),
        {
          success: function (response) {
            icon.removeClass('fa-spinner fa-spin');
            icon.addClass('fa-chevron-down');
            row.child(response).show();
            $('[data-toggle="tooltip"]').tooltip({container: "body"});
            $('[data-toggle="popover"]').popover({container: "body"});
            $('body').on('click', function (e) {
              let element = $('.omim-popover');
              // hide any open popovers when the anywhere else in the body is clicked
              if (!element.is(e.target) && element.has(e.target).length === 0 && $('.popover').has(e.target).length === 0) {
                element.popover('hide');
              }
            });
            $(".comment-button-delete").on("click", commentDeleteToggle);
            $(".comment-button-delete-cancel").on("click", commentDeleteToggle);
            $(".comment-button-delete-submit").on("click", commentDeleteSubmit);
            $(".comment-button-edit").on("click", commentEditToggle);
            $(".comment-button-edit-cancel").on("click", commentEditToggle);
            $(".comment-button-edit-submit").on("click", commentEditSubmit);
            colorVariantEffects();
          },
          error: function (jqXHR, textStatus, errorThrown) {
            console.log("Error during AJAX call: ", jqXHR, textStatus, errorThrown);
          }
        }
      );
    }
  }
});

$("#settingsDownload").click(
  function() {
    var dump = $("#settingsDump").val();
    $(this).attr('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(dump));
    $(this).attr('download', 'settings_dump.json');
  }
);

function activateClass(o) {
  if (!$(o).hasClass("active")) {
    $(o).addClass("active");
  }
}

function updateSettings() {
  var settings = JSON.parse($("#settingsDump").val());
  var endings = ["_gt", "_dp_het", "_dp_hom", "_ad", "_gq", "_fail", "_ab"];
  var failed = [];
  for (var key in settings) {
    for (var j = 0; j < endings.length; ++j) {
      if (key.endsWith(endings[j]) && !$("#filterForm").find("input[name=" + key + "], select[name=" + key + "]").length) {
        patient = key.slice(0, key.length - endings[j].length);
        if (!failed.includes(patient)) {
          failed.push(patient);
        }
      }
    }
    $("#filterForm").find("input[name=" + key + "], select[name=" + key + "], textarea[name=" + key + "]").each(
      function(i) {
        if ($(this).is(":radio")) {
          label = "label[for='id_" + key + "_" + i + "']";
          if ($(this).val() == settings[key]) {
            activateClass(label);
            $(this).prop("checked", true);
          }
          else {
            $(this).prop("checked", false);
            $(label).removeClass("active");
          }
        }
        else if ($(this).is(":checkbox")) {
          label = "label[for='id_" + key + "']";
          if (settings[key]) {
            activateClass(label);
          }
          else {
            $(label).removeClass("active");
          }
          $(this).prop("checked", settings[key]);
        }
        else {
          // also valid for select and textarea
          $(this).val(settings[key]);
        }
      }
    );
  }
  if (failed.length) {
    alert("The following patients do not exist in pedigree: " + failed.join(", ") + ".\nPlease check your JSON input.");
  }
}


function updateSettingsDump() {
  var settings = {};
  $("#filterForm").find("input, select, textarea").each(
    function() {
      if ($(this).attr("id") && $(this).attr("id").match("^template")) {
        return;
      }
      if ($(this).is(":radio")) {
        if ($(this).is(":checked")) {
          settings[$(this).attr("name")] = $(this).val();
        }
      }
      else if ($(this).is(":checkbox")) {
        settings[$(this).attr("name")] = $(this).is(":checked");
      }
      else if ($(this).is("select")) {
        settings[$(this).attr("name")] = $(this).find("option:selected").val();
      }
      else {
        if ($(this).attr("name") == "settingsDump") {
          return true;
        }
        settings[$(this).attr("name")] = $(this).val();
      }
    }
  );
  delete settings["csrfmiddlewaretoken"];
  delete settings["undefined"];
  delete settings["submit"];
  $("#settingsDump").val(JSON.stringify(settings, null, 2));
}

const defaultPresetsIds = {
  // Frequency
  "thousand_genomes_enabled": true,
  "thousand_genomes_homozygous": 0,
  "thousand_genomes_heterozygous": 4,
  "thousand_genomes_frequency": 0.002,

  "exac_enabled": true,
  "exac_homozygous": 0,
  "exac_heterozygous": 10,
  "exac_frequency": 0.002,

  "gnomad_exomes_enabled": true,
  "gnomad_exomes_homozygous": 0,
  "gnomad_exomes_heterozygous": 20,
  "gnomad_exomes_frequency": 0.002,

  "gnomad_genomes_enabled": true,
  "gnomad_genomes_homozygous": 0,
  "gnomad_genomes_heterozygous": 4,
  "gnomad_genomes_frequency": 0.002,

  "inhouse_enabled": true,
  "inhouse_homozygous": null,
  "inhouse_heterozygous": null,
  "inhouse_carriers": 20,

  // Variants & Effect
  "var_type_snv": true,
  "var_type_mnv": true,
  "var_type_indel": true,

  "transcripts_coding": true,
  "transcripts_noncoding": true,

  "effect_complex_substitution": true,
  "effect_direct_tandem_duplication": true,
  "effect_disruptive_inframe_deletion": true,
  "effect_disruptive_inframe_insertion": true,
  "effect_exon_loss_variant": true,
  "effect_feature_truncation": true,
  "effect_frameshift_elongation": true,
  "effect_frameshift_truncation": true,
  "effect_frameshift_variant": true,
  "effect_inframe_deletion": true,
  "effect_inframe_insertion": true,
  "effect_internal_feature_elongation": true,
  "effect_missense_variant": true,
  "effect_mnv": true,
  "effect_start_lost": true,
  "effect_stop_gained": true,
  "effect_stop_lost": true,
  "effect_structural_variant": true,
  "effect_transcript_ablation": true,
  "effect_splice_acceptor_variant": true,
  "effect_splice_donor_variant": true,
  "effect_splice_region_variant": true,
  "effect_stop_retained_variant": true,
  "effect_synonymous_variant": false,
  "effect_coding_transcript_intron_variant": false,
  "effect_five_prime_UTR_exon_variant": true,
  "effect_five_prime_UTR_intron_variant": false,
  "effect_three_prime_UTR_exon_variant": true,
  "effect_three_prime_UTR_intron_variant": false,
  "effect_downstream_gene_variant": false,
  "effect_intergenic_variant": false,
  "effect_non_coding_transcript_exon_variant": false,
  "effect_non_coding_transcript_intron_variant": false,
  "effect_upstream_gene_variant": false,

  // Clinvar/HGMD
  "require_in_clinvar": false,
  "remove_if_in_dbsnp": false,
  "require_in_hgmd_public": false,
  "display_hgmd_public_membership": false,
  "clinvar_origin_germline": true,
};

const defaultPresetsClasses = {
  "quality-field-dp-het": 8,
  "quality-field-dp-hom": 4,
  "quality-field-ab": 0.2,
  "quality-field-gq": 20,
  "quality-field-ad": 2,
  "quality-field-fail": "drop-variant",
};

const medgenPresetsClasses = {
};

const presets = {
  "medgen-strict": {
    "ids": Object.assign({}, defaultPresetsIds, {}),
    "classes": Object.assign({}, defaultPresetsClasses, {
      "quality-field-dp-het": 10,
      "quality-field-dp-hom": 5,
      "quality-field-ab": 0.3,
      "quality-field-gq": 30,
      "quality-field-ad": 3,
      "quality-field-fail": "drop-variant",
    }),
  },
  "medgen-super-strict": {
    "ids": Object.assign({}, defaultPresetsIds, {
      "thousand_genomes_homozygous": 0,
      "thousand_genomes_heterozygous": 1,
      "exac_homozygous": 0,
      "exac_heterozygous": 1,
      "gnomad_exomes_homozygous": 0,
      "gnomad_exomes_heterozygous": 1,
      "gnomad_genomes_homozygous": 0,
      "gnomad_genomes_heterozygous": 1,
    }),
    "classes": Object.assign({}, defaultPresetsClasses, {
      "quality-field-dp-het": 10,
      "quality-field-dp-hom": 5,
      "quality-field-ab": 0.3,
      "quality-field-gq": 30,
      "quality-field-ad": 3,
      "quality-field-fail": "drop-variant"
    }),
  },
  "medgen-recessive": {
    "ids": Object.assign({}, defaultPresetsIds, {
      "thousand_genomes_homozygous": 4,
      "thousand_genomes_heterozygous": 240,
      "thousand_genomes_frequency": 0.01,
      "exac_homozygous": 10,
      "exac_heterozygous": 600,
      "exac_frequency": 0.01,
      "gnomad_exomes_homozygous": 20,
      "gnomad_exomes_heterozygous": 1200,
      "gnomad_exomes_frequency": 0.01,
      "gnomad_genomes_homozygous": 4,
      "gnomad_genomes_heterozygous": 150,
      "gnomad_genomes_frequency": 0.01,
    }),
    "classes": Object.assign({}, defaultPresetsClasses, {}),
  },
  "medgen-relaxed": {
    "ids": Object.assign({}, defaultPresetsIds, {
      "thousand_genomes_heterozygous": 10,
      "thousand_genomes_frequency": 0.01,
      "exac_heterozygous": 25,
      "exac_frequency": 0.01,
      "gnomad_exomes_heterozygous": 50,
      "gnomad_exomes_frequency": 0.01,
      "gnomad_genomes_heterozygous": 20,
      "gnomad_genomes_frequency": 0.01,
    }),
    "classes": Object.assign({}, defaultPresetsClasses, {}),
  },
  "medgen-clinvar": {
    "ids": Object.assign({}, defaultPresetsIds, {
      "thousand_genomes_enabled": false,
      "exac_enabled": false,
      "gnomad_exomes_enabled": false,
      "gnomad_genomes_enabled": false,
      "inhouse_enabled": false,

      "require_in_clinvar": true,
      "remove_if_in_dbsnp": true,
      "require_in_hgmd_public": false,
      "display_hgmd_public_membership": true,
      "clinvar_include_pathogenic": true,
      "clinvar_include_likely_pathogenic": true,
      "clinvar_include_uncertain_significance": false,
      "clinvar_include_likely_benign": false,
      "clinvar_include_benign": false,
      "clinvar_origin_germline": true,
      "clinvar_origin_somatic": false,

      "effect_group_all": true
    }),
    "classes": Object.assign({}, defaultPresetsClasses, {
      "quality-field-fail": "ignore"
    }),
  },
  "full-exome": {
    "ids": Object.assign({}, defaultPresetsIds, {
      "thousand_genomes_enabled": false,
      "exac_enabled": false,
      "gnomad_exomes_enabled": false,
      "gnomad_genomes_enabled": false,
      "inhouse_enabled": false,

      "require_in_clinvar": false,
      "remove_if_in_dbsnp": false,
      "require_in_hgmd_public": false,
      "display_hgmd_public_membership": false,

      "effect_group_all": true
    }),
    "classes": Object.assign({}, defaultPresetsClasses, {
      "quality-field-fail": "ignore"
    }),
  }
};

let presets_genelist = {
  "muc": {
    "field": "gene_blacklist",
    "data": [
      "MUCL3",
      "MUCRX",
      "MUC1",
      "MUC2",
      "MUC3A",
      "MUC3B",
      "MUC4",
      "MUC5AC",
      "MUC5B",
      "MUC5B-AS1",
      "MUC6",
      "MUC7",
      "MUC8",
      "MUC12",
      "MUC13",
      "MUC15",
      "MUC16",
      "MUC17",
      "MUC19",
      "MUC20",
      "MUC20-OT1",
      "MUC20P1",
      "MUC21",
      "MUC22",
      "MUCL1"
    ],
  },
  "hla": {
    "field": "gene_blacklist",
    "data": [
      "HLA-A",
      "HLA-B",
      "HLA-C",
      "HLA-DMA",
      "HLA-DMB",
      "HLA-DOA",
      "HLA-DOB",
      "HLA-DPA1",
      "HLA-DPA2",
      "HLA-DPA3",
      "HLA-DPB1",
      "HLA-DPB2",
      "HLA-DQA1",
      "HLA-DQA2",
      "HLA-DQB1",
      "HLA-DQB1-AS1",
      "HLA-DQB2",
      "HLA-DQB3",
      "HLA-DRA",
      "HLA-DRB1",
      "HLA-DRB2",
      "HLA-DRB3",
      "HLA-DRB4",
      "HLA-DRB5",
      "HLA-DRB6",
      "HLA-DRB7",
      "HLA-DRB8",
      "HLA-DRB9",
      "HLA-E",
      "HLA-F",
      "HLA-F-AS1",
      "HLA-G",
      "HLA-H",
      "HLA-J",
      "HLA-K",
      "HLA-L",
      "HLA-N",
      "HLA-P",
      "HLA-S",
      "HLA-T",
      "HLA-U",
      "HLA-V",
      "HLA-W",
      "HLA-X",
      "HLA-Y",
      "HLA-Z"
    ]
  },
  "acmg1": {
    "field": "gene_whitelist",
    "data": [
      "ACTC1",
      "ACTA2",
      "APOB",
      "BRCA1",
      "CACNA1S",
      "COL3A1",
      "MLH1",
      "DSC2",
      "DSP",
      "DSG2",
      "FBN1",
      "LMNA",
      "KCNH2",
      "MYH11",
      "MYH7",
      "MYL2",
      "MYL3",
      "RET",
      "RYR1",
      "RYR2",
      "SDHB",
      "TGFBR1",
      "TGFBR2",
      "TPM1",
      "TNNI3",
      "TNNT2",
      "TSC2",
      "TP53",
      "GLA",
      "SCN5A",
      "BRCA2",
      "PMS2",
      "MSH6",
      "MYBPC3",
      "PTEN",
      "STK11",
      "SDHC",
      "SDHD",
      "PRKAG2",
      "PKP2",
      "SMAD3",
      "MUTYH",
      "TSC1",
      "LDLR",
      "WT1",
      "NF2",
      "KCNQ1",
      "PCSK9",
      "VHL",
      "MSH2",
      "APC",
      "TMEM43",
      "SDHAF2",
      "MEN1",
      "RB1",
      "MYLK"
    ],
  },
  "acmg2": {
    "field": "gene_whitelist",
    "data": [
      "ACTC1",
      "ACTA2",
      "APOB",
      "BRCA1",
      "CACNA1S",
      "COL3A1",
      "MLH1",
      "DSC2",
      "DSP",
      "DSG2",
      "FBN1",
      "LMNA",
      "KCNH2",
      "MYH11",
      "MYH7",
      "MYL2",
      "MYL3",
      "RET",
      "RYR1",
      "RYR2",
      "SDHB",
      "TGFBR1",
      "TGFBR2",
      "TPM1",
      "TNNI3",
      "TNNT2",
      "TSC2",
      "TP53",
      "OTC",
      "GLA",
      "SCN5A",
      "BRCA2",
      "PMS2",
      "MSH6",
      "MYBPC3",
      "SMAD4",
      "BMPR1A",
      "PTEN",
      "STK11",
      "SDHC",
      "SDHD",
      "PRKAG2",
      "PKP2",
      "SMAD3",
      "MUTYH",
      "TSC1",
      "ATP7B",
      "LDLR",
      "WT1",
      "NF2",
      "KCNQ1",
      "PCSK9",
      "VHL",
      "MSH2",
      "APC",
      "TMEM43",
      "SDHAF2",
      "MEN1",
      "RB1"
    ]
  }
};


function loadPresets(element) {
  const presetsName = element.data("preset-name");

  for (var key in presets[presetsName]["ids"]) {
    const val = presets[presetsName]["ids"][key];
    const tag = $("#id_" + key);
    const inputType = tag.attr("type");
    if (inputType == "checkbox") {
      if (key == "effect_group_all") {
        tag.prop("checked", false);
        tag.click();
      } else {
        tag.prop("checked", val);
      }
    } else {
      tag.prop("value", val);
    }
  }
  updateCheckboxes(null);

  for (var key in presets[presetsName]["classes"]) {
    const val = presets[presetsName]["classes"][key];
    const tag = $("." + key);
    tag.prop("value", val);
  }
}

function loadGenelistPresets(e) {
  const presetName = $(e.currentTarget).data("preset-name");
  const tag = $("#id_" + presets_genelist[presetName]["field"]);
  let val = tag.val();
  if (val == "") {
    tag.val(presets_genelist[presetName]["data"].join(" "));
  }
  else {
    tag.val(val + " " + presets_genelist[presetName]["data"].join(" "));
  }
}

function loadGenotypePresets(e) {
  const presetName = $(e.currentTarget).data("preset-name");
  if (compHetCurrentIndex) {
      compHetCurrentIndex.trigger("change", ["any"]);
  }
  const preset = presetName.split(":");
  $(".genotype-field-gt." + preset[0]).each(
    function () {
      $(this).val(preset[1]);
    }
  )
}

// Current index patient dropdown element of compound heterozygous mode.
let compHetCurrentIndex = null;

function restoreAfterCompHetMode(e, value=null) {
    /**
     * Function to restore GT values when disabling compound heterozygous mode.
     *
     * This function is triggered when a GT field is changed (clicking the comp. het. mode disabling button triggers
     * a change). It accepts the optional value to be set to: When the user doesn't directly change the field but
     * it is triggered via the disabling button, we need to send some value.
     */
    // Iterate over all GT fields.
    $("[id^=id_][id$=_gt]").each(
        function () {
            // Get the id of the GT field.
            var id = $(this).attr("id");
            // Get the id of the associated compound heterozygous info field for this role.
            var role = $("#compound_heterozygous_role_" + $(this).attr("name"));
            if (compHetCurrentIndex.attr("id") == id) {
                // If the GT field is of the selected index patient and we clicked the disable button, set the value to
                // the value passed to the function. If value is null, the user selected its value and nothing is done.
                if (value) {
                    $(this).val(value);
                }
                return;
            }
            // Make the hidden dropdown fields visible again.
            $(this).toggle();
            // Erase the text of the info field.
            role.text("");
            // Hide the info field.
            role.toggle();
        }
    );
    // Hide the disable button info and reset the current index.
    $("#compound_heterozygous_warning").hide();
    compHetCurrentIndex = null;
}


function loadCompHetMode(e, value=null) {
    /**
     * Function to enable UI decorations for the compound heterozygous mode, if ``index`` is selected.
     *
     * Called on every change of the GT field. It checks whether the ``index`` value was selected and hides GT fields
     * of all other patients and enables the info fields. It accepts the optional value to be set to: When the user
     * doesn't directly change the field but it is triggered via the disabling button, we need to send some value.
     */
    // Get the current element.
    const target = $(e.currentTarget);
    // Unassign any restore function that got assigned to the ``change`` handler.
    target.off("change", restoreAfterCompHetMode);
    // If called via the disable button, set dropdown to the passed value. Otherwise leave the users choice.
    // It is important for the case the users clicks the disabling button: This function is called before the restore
    // function, because they are called in order of assignment, and this function is initially assigned. When we don't
    // receive a value we change to (which is the case when not selecting via dropdown), the value will stay ``index``
    // and trigger of the comphet mode once again. To prevent this, we receive the value from the ``change`` triggered
    // by clicking the disable button.
    if (value) {
        target.val(value);
    }
    // If the selected value is ``index``, enable all compound het embellishments.
    if (target.val() == "index") {
        // Set the global variable to the current element.
        compHetCurrentIndex = target;
        // Build a dictionary that maps the mother and father id of the index patient to the info text we will display.
        let ids = {};
        ids["id_" + target.data("mother") + "_gt"] = "c/h mother";
        ids["id_" + target.data("father") + "_gt"] = "c/h father";
        // Iterate over all GT fields.
        $("[id^=id_][id$=_gt]").each(
            function () {
                // Get the id of the GT field.
                var id = $(this).attr("id");
                // Get the id of the associated compound heterozygous info field for this role.
                var role = $("#compound_heterozygous_role_" + $(this).attr("name"));
                // The current (index patients) field stays as it is, so do nothing.
                if (target.attr("id") == id) {
                    return;
                }
                // Hide all other fields.
                $(this).toggle();
                // For mother and father, assign the info text, all others get a dash.
                if (id in ids) {
                    role.text(ids[id]);
                }
                else {
                    role.text("any");
                }
                // Show info field for all other fields.
                role.toggle();
            }
        );
        // Show the info/disable button.
        $("#compound_heterozygous_warning").show();
        // Assign the restore function to the change handler.
        target.on("change", restoreAfterCompHetMode);
    }
}


function initCompHetMode() {
    /**
     * Function to initialize the comphet mode when reloading the page.
     *
     * Loading the comphet mode depends solely on the ``change`` handler of the GT fields. Thus, reloading the page
     * doesn't trigger the comphet mode check. Simulate this by trigger ``change`` on every GT field without changing
     * the actual value.
     */
    // Iterate over all GT fields.
    $("[id^=id_][id$=_gt]").each(
        function () {
            // Trigger ``change`` handler.
            $(this).trigger("change");
        }
    );
}


function transferQualitySettings(e) {
  const fields = ["dp-het", "dp-hom", "ab", "gq", "ad", "ad-max", "fail"];
  const affection = $("#qualityTemplateAffectionSelection").val();
  var subgroup = "";
  if (affection != "all") {
    subgroup += "." + affection;
  }
  $.each(fields, function (index, field) {
    $(".quality-field-" + field + subgroup).each(
      function() {
        let template_field = $("#template_quality_field_" + field.replace("-", "_"));
        if (field == "ad-max" || template_field.val() != "") {
          $(this).val(template_field.val());
        }
      }
    );
  });
}


function makeNumberFieldsReceiveOnlyDigits() {
  $("input.numberDecimal[type='text']").keypress(function(data) {
    if (data.which < 46 || data.which > 57 || data.which === 47) {
      data.preventDefault();
    }
    if (data.which === 46 && /[.]/.test($(this).val())) {
      data.preventDefault();
    }
  });
  $("input.numberInteger[type='text']").keypress(function(data) {
    if (data.which < 48 || data.which > 57) {
      data.preventDefault();
    }
  });
}


/**
 * The following is a hack around the issue that dropdown menus that are inside a container with limited size and
 * `auto` or  `scroll`overflow behaviour are trapped inside the container and in case they are bigger than the
 * container, are not completely accessible. https://github.com/twbs/bootstrap/issues/24251#issuecomment-334271729
 */
$(document).on('show.bs.dropdown', '#presets-genotype-dropdown', function(e) {
    var dropdown = $(e.target).find('.dropdown-menu');
    dropdown.appendTo('body');
    $(this).on('hidden.bs.dropdown', function () {
      dropdown.appendTo(e.target);
    })
});


$(document).ready(
  function() {
    makeNumberFieldsReceiveOnlyDigits();
    if ($("#settingsDump").val() != "") {
      updateSettings();
    }
    $("#filterForm").find("input, select, textarea").not("#settingsDump").change(updateSettingsDump);
    updateSettingsDump();
    $(".load-presets").click(function (e) { loadPresets($(e.currentTarget)) });
    $(".load-blacklist").click(loadGenelistPresets);
    $(".load-whitelist").click(loadGenelistPresets);
    $(".load-genotype").click(loadGenotypePresets);
    $(".load-comphet-mode").on("change", loadCompHetMode);
    $("#qualityTemplateApplyButton").click(transferQualitySettings);
    $("#compound_heterozygous_disable").click(function() { compHetCurrentIndex.trigger("change", ["any"]) });
    $("#settingsSet").click(updateSettings);
    $("#settingsSet").click(initCompHetMode);
    // Assign click handler function to submit button
    filterButton.click(
      function(e) {
        handleEvent($(this).attr("data-event-type"), null);
      }
    );
    filterButton.attr("data-event-type", EVENT_SUBMIT);
    // Load default/strict presets.
    if (!settings_restored) {
        loadPresets($("#load-presets-medgen-strict"));
    }
    // Kick-off state machine.
    handleEvent(EVENT_START, null);
    // Load comphet mode (if index is set)
    initCompHetMode();
    $('[data-toggle="popover"]').popover({container: 'body'});
    $('[data-toggle="tooltip"]').tooltip({container: 'body'});
    $('.popover-dismiss').popover({
        trigger: 'focus'
    });
  }
);