#!/usr/bin/env python3
import cgi
import mysql.connector
import subprocess
import re
import jinja2
from Bio import Align, SeqIO, pairwise2
import os

print("Content-type: text/html\n\n")

if os.path.exists("query.fasta"):
    os.remove("query.fasta")

# Get the user input
form = cgi.FieldStorage()
query_file = form['query_file'].file if 'query_file' in form else None
query_sequence = form.getvalue('query_sequence')


# Connect to the MySQL database
db = mysql.connector.connect(user='tmuamar1', password='bodo3289', host='localhost', database='tmuamar1_final')
cursor = db.cursor()

# Execute the query to get the sequences from the database
sql = "SELECT seq_id, sequence FROM proteins"
cursor.execute(sql)
results = cursor.fetchall()

# Write the sequences to a temporary file
with open("sequences.fasta", "w") as f:
    for i, row in enumerate(results):
        seq_id=row[0][:10]
        sequence = row[1]
        f.write(">{}\n{}\n".format(seq_id, sequence))

# Write the query sequence to a temporary file
if not os.path.exists("query.fasta"):
    open("query.fasta", "w").close()
    subprocess.run(["chmod", "755", "query.fasta"], check=True)
if query_file:
    with open("query.fasta", "w") as f:
        f.write(query_file.read().decode())
if query_sequence is not None and query_sequence.strip() != "":
    with open("query.fasta", "w") as f:
        if query_sequence.startswith(">"):
            f.write(query_sequence.strip())
        else:
            f.write(">query\n{}\n".format(query_sequence.strip()))


# Run the BLAST search
blast_command = "blastp -query query.fasta -subject sequences.fasta -outfmt '10 qseqid sseqid pident length mismatch gapopen evalue bitscore qseq sseq'"
result = subprocess.run(blast_command, shell=True, check=True, stdout=subprocess.PIPE, stderr=subprocess.PIPE)
blast_output = result.stdout.decode().strip().split("\n")

# Parse the BLAST results
blast_results = []
for line in blast_output:
    line = line.strip().split(",")
    if len(line) == 10:
        match_dict = {
            "query_id": line[0],
            "subject_id": line[1],
            "percent_identity": line[2],
            "alignment_length": line[3],
            "mismatches": line[4],
            "gap_opens": line[5],
            "e_value": line[6],
            "bit_score": line[7],
            "qseq": line[8],
            "sseq": line[9]
        }
        blast_results.append(match_dict)

templateLoader = jinja2.FileSystemLoader(searchpath="/var/www/html/tmuamar1/final/")
env = jinja2.Environment(loader=templateLoader)
template = env.get_template('final.html')
output = template.render(matches=blast_results)
print(output)
