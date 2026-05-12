package com.kcbaels.api.contact;

import org.springframework.data.jpa.repository.JpaRepository;

public interface ContactRepository extends JpaRepository<ContactSubmission, Long> {}
