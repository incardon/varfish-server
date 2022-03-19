# Generated by Django 3.2.12 on 2022-03-19 08:42

from django.db import migrations
from django.conf import settings

operations = []


if not settings.IS_TESTING:
    operations.append(
        migrations.RunSQL(
            r"""
            DROP INDEX variants_sm_coordinates;

            CREATE UNIQUE INDEX variants_sm_id_case_id ON variants_smallvariant (id, case_id);
            CREATE INDEX variants_sm_case_id_chr_no ON variants_smallvariant (case_id, chromosome_no);
            CREATE INDEX variants_sm_case_id_set_id ON variants_smallvariant (case_id, set_id);
            CREATE INDEX variants_sm_case_id_for_bin ON variants_smallvariant (case_id, release, chromosome, bin);
            CREATE INDEX variants_sm_case_id_coords ON variants_smallvariant (case_id, release, chromosome, start, reference, alternative);
            """,
            """
            CREATE INDEX variants_sm_coordinates ON variants_smallvariant USING btree (release, chromosome, start);

            DROP INDEX variants_sm_id_case_id;
            DROP INDEX variants_sm_case_id_chr_no;
            DROP INDEX variants_sm_case_id_set_id;
            DROP INDEX variants_sm_case_id_for_bin;
            DROP INDEX variants_sm_case_id_full_coords;
            """,
        )
    )


class Migration(migrations.Migration):

    dependencies = [
        ("variants", "0084_auto_20220112_0657"),
    ]
    operations = operations
