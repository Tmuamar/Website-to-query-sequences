#!/usr/bin/env python3
import mysql.connector

# Connect to the MySQL database
cnx = mysql.connector.connect(user='tmuamar1', password='bodo3289', host='localhost', database='tmuamar1_final')
cursor = cnx.cursor()

# Parse the UniProtKB FASTA file and insert each sequence into the MySQL table
with open('uniprot_sprot.fasta', 'r') as f:
    seq_id = ''
    sequence = ''
    for line in f:
        if line.startswith('>'):
            if seq_id != '' and sequence != '':
                # Insert the sequence into the MySQL table
                add_protein = ("INSERT INTO proteins"
                               "(seq_id, sequence)"
                               "VALUES (%s, %s)")
                data_protein = (seq_id, sequence)
                cursor.execute(add_protein, data_protein)
                cnx.commit()
            # Start a new sequence
            seq_id = line.strip()[1:]
            sequence = ''
        else:
            sequence += line.strip()

# Close the database connection
cursor.close()
cnx.close()
