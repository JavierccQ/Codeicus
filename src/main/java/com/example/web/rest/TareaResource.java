package com.example.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.example.domain.Tarea;
import com.example.repository.TareaRepository;
import com.example.web.rest.errors.BadRequestAlertException;
import com.example.web.rest.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing Tarea.
 */
@RestController
@RequestMapping("/api")
public class TareaResource {

    private final Logger log = LoggerFactory.getLogger(TareaResource.class);

    private static final String ENTITY_NAME = "tarea";

    private final TareaRepository tareaRepository;

    public TareaResource(TareaRepository tareaRepository) {
        this.tareaRepository = tareaRepository;
    }

    /**
     * POST  /tareas : Create a new tarea.
     *
     * @param tarea the tarea to create
     * @return the ResponseEntity with status 201 (Created) and with body the new tarea, or with status 400 (Bad Request) if the tarea has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/tareas")
    @Timed
    public ResponseEntity<Tarea> createTarea(@RequestBody Tarea tarea) throws URISyntaxException {
        log.debug("REST request to save Tarea : {}", tarea);
        if (tarea.getId() != null) {
            throw new BadRequestAlertException("A new tarea cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Tarea result = tareaRepository.save(tarea);
        return ResponseEntity.created(new URI("/api/tareas/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /tareas : Updates an existing tarea.
     *
     * @param tarea the tarea to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated tarea,
     * or with status 400 (Bad Request) if the tarea is not valid,
     * or with status 500 (Internal Server Error) if the tarea couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/tareas")
    @Timed
    public ResponseEntity<Tarea> updateTarea(@RequestBody Tarea tarea) throws URISyntaxException {
        log.debug("REST request to update Tarea : {}", tarea);
        if (tarea.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Tarea result = tareaRepository.save(tarea);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, tarea.getId().toString()))
            .body(result);
    }

    /**
     * GET  /tareas : get all the tareas.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of tareas in body
     */
    @GetMapping("/tareas")
    @Timed
    public List<Tarea> getAllTareas() {
        log.debug("REST request to get all Tareas");
        return tareaRepository.findAll();
    }

    /**
     * GET  /tareas/:id : get the "id" tarea.
     *
     * @param id the id of the tarea to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the tarea, or with status 404 (Not Found)
     */
    @GetMapping("/tareas/{id}")
    @Timed
    public ResponseEntity<Tarea> getTarea(@PathVariable Long id) {
        log.debug("REST request to get Tarea : {}", id);
        Optional<Tarea> tarea = tareaRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(tarea);
    }

    /**
     * DELETE  /tareas/:id : delete the "id" tarea.
     *
     * @param id the id of the tarea to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/tareas/{id}")
    @Timed
    public ResponseEntity<Void> deleteTarea(@PathVariable Long id) {
        log.debug("REST request to delete Tarea : {}", id);

        tareaRepository.deleteById(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
