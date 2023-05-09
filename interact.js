#!/usr/bin/env node

function comparePercentIdentity(a, b) {
  var aPercent = parseFloat($(a).find('td:eq(2)').text())
  var bPercent = parseFloat($(b).find('td:eq(2)').text())
  if (aPercent < bPercent) {
    return -1
  }
  if (aPercent > bPercent) {
    return 1
  }
  return 0
}
function compareAlignmentLength(a, b) {
  var aLength = parseInt($(a).find('td:eq(3)').text())
  var bLength = parseInt($(b).find('td:eq(3)').text())
  if (aLength < bLength) {
    return -1
  }
  if (aLength > bLength) {
    return 1
  }
  return 0
}

function compareMismatches(a, b) {
  var aMat = parseInt($(a).find('td:eq(4)').text())
  var bMat = parseInt($(b).find('td:eq(4)').text())
  if (aMat < bMat) {
    return -1
  }
  if (aMat > bMat) {
    return 1
  }
  return 0
}
function compareGapOpens(a, b) {
  var aNum = parseInt($(a).find('td:eq(5)').text())
  var bNum = parseInt($(b).find('td:eq(5)').text())
  if (aNum < bNum) {
    return -1
  }
  if (aNum > bNum) {
    return 1
  }
  return 0
}
function compareEValue(a, b) {
  var aE = parseFloat($(a).find('td:eq(6)').text())
  var bE = parseFloat($(b).find('td:eq(6)').text())
  if (aE < bE) {
    return -1
  }
  if (aE > bE) {
    return 1
  }
  return 0
}
function compareBitScore(a, b) {
  var aBit = parseFloat($(a).find('td:eq(7)').text())
  var bBit = parseFloat($(b).find('td:eq(7)').text())
  if (aBit < bBit) {
    return -1
  }
  if (aBit > bBit) {
    return 1
  }
  return 0
}

$(document).ready(function() {
  var sortOrder = 1;
  $("th.sortable").click(function() {
    var table = $(this).parents('table').eq(0);
    var rows = table.find('tr:gt(0)').toArray();
    if (this.id === "percent-identity") {
      rows.sort(comparePercentIdentity);
    } else if (this.id === "alignment-length") {
      rows.sort(compareAlignmentLength);
    } else if (this.id === "mismatches"){
      rows.sort(compareMismatches);
    }else if (this.id === "gap-opens") {
      rows.sort(compareGapOpens);
    }else if (this.id === "e-value") {
      rows.sort(compareEValue);
    }else if (this.id === "bit-score") {
      rows.sort(compareBitScore);
    }
    if (sortOrder == -1) {
      rows = rows.reverse();
    }
    for (var i = 0; i < rows.length; i++) {
      table.append(rows[i]);
    }
    $('.arrow').removeClass('asc desc');
    $(this).find('.arrow').addClass(sortOrder == 1 ? 'asc' : 'desc');
    sortOrder = -sortOrder;
  });
  var matchedRows = $('tr');
  // Loop through all the matched rows
  $.each(matchedRows, function(index, row) {
    var querySeq = $(row).find('.matchqseq').text();
    var subjectSeq = $(row).find('.matchsseq').text();
    var querySeqChars = querySeq.split('');
    var subjectSeqChars = subjectSeq.split('');
    var highlightedQuerySeq = '';
    var highlightedSubjectSeq = '';

  // Loop through each character in querySeq and subjectSeq
  for (var i = 0; i < querySeqChars.length; i++) {
    if (querySeqChars[i] === subjectSeqChars[i]) {
      // If the characters match, add it to the highlightedQuerySeq with a different class
      highlightedQuerySeq += '<span class="highlight">' + querySeqChars[i] + '</span>';
      highlightedSubjectSeq += '<span class="highlight">' + subjectSeqChars[i] + '</span>';
    } else {
      // If the characters don't match, add it to the highlightedQuerySeq and highlightedSubjectSeq with a regular class
      highlightedQuerySeq += '<span>' + querySeqChars[i] + '</span>';
      highlightedSubjectSeq += '<span>' + subjectSeqChars[i] + '</span>';
    }
  }

  // Replace the querySeq and subjectSeq with the highlightedSeq
  $(row).find('.matchqseq').html(highlightedQuerySeq);
  $(row).find('.matchsseq').html(highlightedSubjectSeq);
  });

  $('.matchqseq, .matchsseq').hover(function() {
  $(this).addClass('active');
  $(this).siblings('.matchqseq, .matchsseq').addClass('active');
  },
  function() {
  $(this).removeClass('active');
  $(this).siblings('.matchqseq, .matchsseq').removeClass('active');
  });

});
