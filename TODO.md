## TODO
# website transfer

<table>
<tr><th>Status</th><th>Task</th></tr>
<tr><th>&#10004</a></th><td>mapfiles for js,css</td></tr>
<tr><th><a href="https://github.com/sestaton/transposome-scripts/blob/master/get_seqs_from_list.pl">get_seqs_from_list.pl</a></th><td>Pull sequences from a file given a file of sequence IDs.</td></tr>
<tr><th><a href="https://github.com/sestaton/transposome-scripts/blob/master/sample_and_interleave_pairs.pl">sample_and_interleave_pairs.pl</a></th><td>Sample reads from both pairs of a paired-end read and interleave them for input to Transposome.</td></tr>
<tr><th><a href="https://github.com/sestaton/transposome-scripts/blob/master/permute_graph_edges.pl">permute_graph_edges.pl</a></th><td>Test a range of parameters for filtering pairwise matches to graph edges.</td></tr>
<tr><th><a href="https://github.com/sestaton/transposome-scripts/blob/master/permute_cluster_joining.pl">permute_cluster_joining.pl</a></th><td>Vary the threshold for joining clusters.</td></tr>
<tr><th><a href="https://github.com/sestaton/transposome-scripts/blob/master/format_database.pl">format_database.pl</a></th><td>Format a FASTA file of repeat sequences for use with Transposome.</td></tr>
<tr><th><a href="https://github.com/sestaton/transposome-scripts/blob/master/select_database_species.pl">select_database_species.pl</a></th><td>Select all sequences from a given species from a repeat database.</td></tr>
<tr><th><a href="https://github.com/sestaton/transposome-scripts/blob/master/full_analysis_with_varying_coverage.pl">full_analysis_with_varying_coverage.pl</a></th><td>Cluster and annotate sequences with varying genome coverage.</td></tr>
</table>

DONE - mapfiles for js,css
DONE - get images in dist/build dir
DONE - get fonts in dist/build
DONE - add stress website (subdomain); perhaps serve static

# coded but not testing in production
- add reverse proxy for blast app
- add https support (NB: certs have not been testing in production)

# new features
DONE - add additional browser security
- use env vars for sensitive files/keys
- improve performance of website (currently at 64/100 by google analytics)
- add data routes with s3
- add mail (mailgun?) middleware
- add custom error responses for dev/prod envs
- add news items for stress site
- work on SEO, esp. for stress.* subdomain
