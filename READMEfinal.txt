* ABOUT *

Web page for uploading a fasta formated protein sequence to find similarties 
with other proteins in the uniprot kb database.

Source code can be obtained here:
https://github.com/Tmuamar/Final-Project

To access the project on the server:
http://bfx3.aap.jhu.edu/tmuamar1/final/final.cgi

Utilizes tools published at:

Utilizes BLASTP tool alogrithm to conduct the search through
the mySQL database created with the uniprotKB data.

* REQUIREMENTS *

Storage is depending on database used for reference sequences.
with uniprotkb database when searching consumes 5000mib memeory
used while idle requires 949mib

* DETAILED USAGE *

1. Enter protein sequence in fasta format or plain text. User can also upload 
a fasta formated file to also find similar proteins.

2. Click "Search" button once file or text is inputed for your protein sequence.

3.  Once the search is completed which takes about 10 seconds to find similarties it will
display a table with query id, sequence id, percent identity, alignment length, mismatches, 
gap opens, e-value, bitscore, and the aligned sequences.

4. In this table you have arrows that allow you to sort the results by descending or ascending order.

5. Additional function is hovering over each aligned sequences will highlight the similarties in green
to allow for easy comparison of the differences between the refernce sequence and query sequence. 

6. sequence ID/reference sequences column has a link to interpro were it will look up that sequence ID
that the query sequence aligned to. Allows for a easier time for scientist to depict the functionality of these proteins.

* DEMO DATA *
sample data for testing:
>query
MEAKNITIDNTTYNFFKFYNINQPLTNLKYLNSERLCFSNAVMGKIVDDASTITITYHRVYFGISGPKPRQVADLGEYYDVNELLNYDTYTKTQEFAQKYNSLVKPTIDAKNWSGNELV

Current mySQL database is using uniprotkb data:

https://ftp.uniprot.org/pub/databases/uniprot/current_release/knowledgebase/complete/uniprot_sprot.fasta.gz
